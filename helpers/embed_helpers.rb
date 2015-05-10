module EmbedHelpers
  def embed_link_for(band, css_class: '')
    js_class = 'js-embed'
    content = band.provider
    # overlay = false
    # if band.provider == 'YouTube'
    #   overlay = true
    #   css_class = 'js-overlay-embed lup-link--img'
    #   content = image_tag(band.embed_image, alt: band.provider)
    # end

    link_to content, band.url, class: [js_class, css_class].join(' '),
      data: {embed: band.embed, height: band.embed_height }
  end

  def youtube_embed(id, css_class = '')
    js_class = 'js-overlay-embed'
    link_url = "https://www.youtube.com/watch?v=#{id}"
    embed_url = "//www.youtube-nocookie.com/embed/#{id}?rel=0&autoplay=1&color=white&showinfo=1&disablekb=1&html5=1"
    link_to link_url, class: [js_class, css_class].join(' '), data: {embed: embed_url} do
      yield
    end
  end


end
