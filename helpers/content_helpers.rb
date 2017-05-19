module ContentHelpers
  def markdown(text)
    Tilt['markdown'].new { text }.render(scope=self)
  end
end
