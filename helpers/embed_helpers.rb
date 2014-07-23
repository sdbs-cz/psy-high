module EmbedHelpers
  def embed_link_for(band)
    css_class = 'js-embed'
    overlay = false
    content = band.provider
    if band.provider == 'YouTube'
      overlay = true
      css_class = 'js-overlay-embed'
      content = image_tag(band.embed_image, alt: band.provider)
    end

    link_to content, band.url, class: [css_class, 'lup-link'].join(' '),
      data: {embed: band.embed, height: band.embed_height }
  end


end
