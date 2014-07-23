require 'oembedr'
require 'excon'
require 'nokogiri'

Oembedr.configure do |configuration|
  configuration.adapter = :excon # :typhoeus seems broken
end

class Embed
  attr_reader :url, :embed, :provider, :embed_image

  def self.fetch(url)
    new(url).fetch
  end

  def initialize(url)
    @url = url
  end

  def fetch
    case @url
    when /bandcamp.com/
      @embed = bandcamp_embed(fetch_bandcamp_id(url))
      @provider = 'Bandcamp'
    when /bandzone.cz/
      @provider = 'Bandzone'
    else
      fetch_oembed(url)
    end
    self
  end

  def to_s
    "#{url}: #{provider} => #{embed}"
  end

  private
  def fetch_bandcamp_id(url)
    doc = Nokogiri::HTML(Excon.get(url).body)
    embedurl = doc.at('meta[property="twitter:player"]').attr('content')
    embedurl[/((album|track)=[^\/]+)/i, 1]
  end

  def bandcamp_embed(id)
    if id.blank?
      nil
    else
      "//bandcamp.com/EmbeddedPlayer/#{id}/size=large/bgcol=ffffff/linkcol=333333/artwork=none/transparent=true/"
    end
  end

  def fetch_oembed(url)
    return unless Oembedr.known_service?(url)
    response = Oembedr.fetch(url).body

    @provider = response['provider_name']
    @embed = extract_iframe(response['html'])
    @embed_image = response['thumbnail_url']
  end

  def extract_iframe(html)
    Nokogiri::HTML.fragment(html).at('iframe').attr('src')
  end
end



