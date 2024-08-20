import axiosInstance from "@/lib/axios";
import Image from "next/image";
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

      axiosInstance
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
        <Image height={20} width={20} src={'/svgs/search_icon.svg'} alt="search-icon" />
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
