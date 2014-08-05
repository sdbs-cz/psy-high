require 'oembedr'
require 'excon'
require 'nokogiri'

Oembedr.configure do |configuration|
  configuration.adapter = :excon # :typhoeus seems broken
end

class BandcampEmbed
  TRACK_HEIGHT = 32
  BASE_HEIGHT = 120

  MAX_HEIGHT = 500
  EMBED_SIZE = 'large'

  def initialize(url)
    @src_doc = Nokogiri::HTML(Excon.get(url).body)
    @src_url = @src_doc.at('meta[property="twitter:player"]').attr('content')
  end

  def embed
    if player_id.blank?
      nil
    else
      "//bandcamp.com/EmbeddedPlayer/#{player_id}/size=large/bgcol=fafafa/linkcol=27CDFC/artwork=small/transparent=true/#{tracklist_param}"
    end
  end

  def embed_height
    if track?
      BASE_HEIGHT
    else
      length = tracks_length + 1 # due to Bandcamp's bottom padding
      [MAX_HEIGHT, BASE_HEIGHT + TRACK_HEIGHT * length].min
    end
  end

  private

  def tracklist_param
    if track?
      'tracklist=false/'
    else
      ''
    end
  end

  def track?
    player_id.include?('track=') || tracks_length == 1
  end

  def album?
    player_id.include?('album=')
  end

  def tracks_length
    @tracks_length = @src_doc.css('[itemprop=tracks]').length
  end

  def player_id
    @player_id ||= @src_url[/((album|track)=[^\/]+)/i, 1]
  end
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
    bc = BandcampEmbed.new(url)
    @embed = bc.embed
    @embed_height = bc.embed_height
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



