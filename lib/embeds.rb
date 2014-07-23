require 'oembedr'
require 'excon'
require 'nokogiri'

Oembedr.configure do |configuration|
  configuration.adapter = :excon # :typhoeus seems broken
end

class Embed
  attr_reader :url, :embed, :provider, :embed_image, :embed_height

  def self.fetch(url)
    new(url).fetch
  end

  def initialize(url)
    @url = url
  end

  def fetch
    case @url
    when /bandcamp.com/
      fetch_bandcamp(@url)
      @provider = 'Bandcamp'
    when /bandzone.cz/
      @provider = 'Bandzone'
    else
      fetch_oembed(@url)
    end
    self
  end

  def to_s
    "#{url}: #{provider} => #{embed}"
  end

  private
  def fetch_bandcamp(url)
    doc = Nokogiri::HTML(Excon.get(url).body)
    embedurl = doc.at('meta[property="twitter:player"]').attr('content')
    @embed = bandcamp_url(embedurl[/((album|track)=[^\/]+)/i, 1])
    @embed_height = doc.at('meta[property="twitter:player:height"]').attr('content')
  end

  def bandcamp_url(id)
    if id.blank?
      nil
    else
      "//bandcamp.com/EmbeddedPlayer/#{id}/size=large/bgcol=fafafa/linkcol=27CDFC/artwork=small/transparent=true/"
    end
  end

  def fetch_oembed(url)
    return unless Oembedr.known_service?(url)
    response = Oembedr.fetch(url).body

    @provider = response['provider_name']

    iframe = Nokogiri::HTML.fragment(response['html']).at('iframe')

    @embed = iframe.attr('src')
    @embed_image = response['thumbnail_url']
    @embed_height = response['height']
  end

end



