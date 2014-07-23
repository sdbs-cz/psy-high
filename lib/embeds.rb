require 'oembedr'
require 'excon'
require 'nokogiri'

Oembedr.configure do |configuration|
  configuration.adapter = :excon # :typhoeus seems broken
end

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
  return [nil, nil] unless Oembedr.known_service?(url)
  response = Oembedr.fetch(url).body

  provider = response['provider_name']
  html = response['html']

  [provider, extract_iframe(html)]
end

def extract_iframe(html)
  Nokogiri::HTML.fragment(html).at('iframe').attr('src')
end

def get_embed(url)
  embed = nil
  provider = nil
  case url
  when /bandcamp.com/
    embed = bandcamp_embed(fetch_bandcamp_id(url))
    provider = 'Bandcamp'
  when /bandzone.cz/
    provider = 'Bandzone'
  else
    provider, embed = fetch_oembed(url)
  end

  puts "#{provider} => #{embed}"

  [provider, embed]
end
