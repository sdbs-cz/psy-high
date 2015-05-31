# coding: utf-8

module LineupHelpers
  def lineup_data(filter)
    bands = ldata.bands[filter]
    last_i = bands.length - 1
    bands.each_with_index { |band, i|
      band[:last] = (i == last_i)
      band[:i] = i
    }.map
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
