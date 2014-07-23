require 'remote_table'
require 'yaml'
require 'fileutils'
require_relative './embeds'

class Hash
  def hmap(&block)
    Hash[self.map {|k, v| block.call(k,v) }]
  end

  # Map only values, maintain keys
  def hmap_val(&block)
    self.hmap { |k, v| [k, block.call(v)] }
  end
end


SOURCE_URL = 'https://docs.google.com/spreadsheets/d/1kE9p2jzpcBpBN0DKjJ5lGsJCxKY7kMvsd_1iuuBNkVc/export?id=1kE9p2jzpcBpBN0DKjJ5lGsJCxKY7kMvsd_1iuuBNkVc&format=csv&gid='

SHEETS = {
  headliners: '1878923985',
  major: '1617292456',
  support: '1189280216'
}

LANGS = [:en, :cs]

LANG_SEP = '_'

TARGET_DIR = "#{__dir__}/../data"
FILE_NAME = 'bands.yml'

def remove_suffixes(hsh)
  hsh
end

# Remove suffixes from the requested language, leave others alone
def fields_for(hsh, lang)
  separator = LANG_SEP
  suffix = /#{separator}#{lang}\z/i

  hsh.hmap do |key, value|
    [key.sub(suffix, '').to_sym, value]
  end
end

def process_embed(row)
  if row[:embed].blank? && !row[:url].blank?
    row[:provider], row[:embed] = get_embed(row[:url])
  end
  row
end

def process_rows(rows, lang)
  rows.map {|r| process_embed(fields_for(r, lang)) }
end

urls = SHEETS.hmap_val do |gid|
  "#{SOURCE_URL}#{gid}"
end

sheets = urls.hmap_val do |url|
  RemoteTable.new(url)
end

# Dump YAML to data/:lang/bands.yml
#  {major: [], minor: []}}
LANGS.each do |lang|
  data = sheets.hmap_val do |sh|
    process_rows(sh, lang)
  end
  dir = "#{TARGET_DIR}/#{lang}"
  FileUtils.mkdir_p dir
  File.open("#{dir}/#{FILE_NAME}", 'w') {|f| f.write data.to_yaml }
end



