module EmbedHelpers
  def embed_link_for(band)
    css_class = 'js-embed'
    if band.provider == 'YouTube'
      css_class = 'js-overlay-embed'
    end

    link_to band.provider, band.url, class: [css_class, 'lup-link']
  end

end
