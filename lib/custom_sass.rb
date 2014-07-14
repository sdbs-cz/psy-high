
module SassListFiles
  def list_files(string)
    assert_type string, :String
    files = Dir.glob("source/#{string.value}").map do |file|
      Sass::Script::String.new(File.basename(file, ".*"))
    end
    Sass::Script::List.new(files, :comma)
  end
  #declare :list_files, [:string]
end

module Sass::Script::Functions
  include SassListFiles
end
