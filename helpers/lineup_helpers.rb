
module LineupHelpers
  def lineup_data(filter)
    bands = bands(filter)
    last_i = bands.length - 1
    bands.each_with_index { |band, i|
      band[:last] = (i == last_i)
      band[:i] = i
    }.map
  end

  def bands(type)
    if type == :major
      ldata.bands.major + ldata.bands.support
    else
      ldata.bands[type]
    end
  end

  # Generate dividing divs, up-to `arity`'s value
  # Examples:
  #   arity = 2 → a b | c d |
  #   arity = 3 → a b | c | d | e f |
  def lineup_dividers(current_i, last = false, arity = 4)
    (2..arity).map { |n|
      if (current_i % n).zero? or last
        partial 'partials/band_divider', locals: {n: n}
      end
    }.join("\n")
  end
end
