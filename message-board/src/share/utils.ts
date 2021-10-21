export const formatDate = (epoch: number) => {
  try {
    const date = new Date(epoch);
    const intl = new Intl.DateTimeFormat("en", {
      minute: "2-digit",
      hour: "2-digit",
      month: "short",
      day: "2-digit",
    });
    return intl.format(date);
  } catch (error) {
    return "Invalid time";
  }
};

export const combinePayload = <S extends { id: any }, D>(
  src: S[],
  dest: Record<string, D>,
  convert: (item: S) => D
) => {
  src.forEach((item) => {
    dest[item.id] = convert(item);
  });
};
