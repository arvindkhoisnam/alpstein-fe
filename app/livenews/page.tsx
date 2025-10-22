import AllCryptos from "../_comps/AllCryptos";
import Paginate from "../_comps/Paginate";

function page() {
  return (
    <div className="mt-24">
      <AllCryptos />
      <Paginate />
    </div>
  );
}

export default page;
