import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);

  useEffect(() => {
    const delayed = setTimeout(() => {
      if (query === "") {
        return setSearchedProducts([]);
      }

      axios
        .get(`/product/getSearchProducts?search=${query.trim()}`)
        .then((res) => {
          setSearchedProducts(res.data?.products);
        })
        .catch((err) => {
          searchedProducts([]);
        });
    }, 200);

    return () => {
      clearTimeout(delayed);
    };
  }, [query]);

  return (
    <div className="search_wrapper">
      <div className="input_wrapper">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.33337 13.3333C10.6471 13.3333 13.3334 10.647 13.3334 7.33333C13.3334 4.01962 10.6471 1.33333 7.33337 1.33333C4.01967 1.33333 1.33337 4.01962 1.33337 7.33333C1.33337 10.647 4.01967 13.3333 7.33337 13.3333Z" stroke="white" stroke-opacity="0.7" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12.62 13.7932C12.9733 14.8599 13.78 14.9665 14.4 14.0332C14.9667 13.1799 14.5933 12.4799 13.5667 12.4799C12.8067 12.4732 12.38 13.0665 12.62 13.7932Z" stroke="white" stroke-opacity="0.7" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <input
          //   onKeyDown={(e) => handleKey(e)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search for..."
        >
        </input>
      </div>
      <div
        className={`search_overlay ${searchedProducts?.length == 0 && "d-none"
          }`}
      >
        <div className="search_products">
          {searchedProducts?.map((product, index) => {
            return (
              <Link key={index} href={`/product/${product.slug}`}>
                <div className="items">
                  <img src={product.thumbnail} alt="Product"></img>
                  <h5>{product.name}</h5>
                  <div className="product-price">
                    {product?.discount?.value > 0 ? (
                      <>
                        <span className="old-price">${product.price}</span>
                        {product.discount.discountType === "flat" ? (
                          <span className="new-price">
                            ${product.price - product.discount.value}
                          </span>
                        ) : (
                          <span className="new-price">
                            $
                            {product.price -
                              Math.floor(
                                product.price * (product.discount.value / 100)
                              )}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="new-price">${product.price}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
