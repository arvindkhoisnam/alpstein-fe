function Spinner({ showPrice }: { showPrice: boolean }) {
  return (
    <span
      className={`spinner ${
        showPrice ? "size-7" : "size-4"
      } rounded-full border-1 border-zinc-700 border-r-zinc-500`}
    ></span>
  );
}

export default Spinner;
