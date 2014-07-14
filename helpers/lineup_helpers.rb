
module LineupHelpers
  def lineup_data(filter)
    bands = data.bands.send(filter)
    last_i = bands.length - 1
    bands.each_with_index { |band, i|
      band[:last] = (i == last_i)
      band[:i] = i
    }.map
  end

  def lineup_dividers(current_i, last = false, arity = 4)
    (2..arity).map { |n|
      if (current_i % n).zero? or last
        partial 'partials/band_divider', locals: {n: n}
      end
    }.join("\n")
  end
end
