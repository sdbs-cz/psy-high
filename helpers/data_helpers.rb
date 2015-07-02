module DataHelpers
  def ldata
    data[I18n.locale]
  end


  def td parent, key
    if parent.send("#{key}?")
      parent[key]
    else
      parent["#{key}_#{I18n.locale}"]
    end
  end

  def td? parent, key
    !td(parent, key).blank?
  end
end
