module UriHelpers
  def cname
    settings[:cname] || I18n.t(:cname)
  end

  def canonical(path = nil)
    URI::HTTP.build(host: cname, path: path)
  end
end
