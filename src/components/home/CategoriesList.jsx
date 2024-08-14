import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

const CategoriesList = () => {
  const { categories } = useAppSelector((state) => state.general);

  return (
    <div className="category_list">
      <div className="cat_main">
        {categories &&
          categories?.categoriesData?.slice(0, 11).map((category, i) => {
            return (
              <li key={i}>
                <Link href={`/search?category=${category?.slug}`}>
                  {category?.name}
                  <i className="fa fa-arrow-right"></i>
                </Link>

                <div
                  className={
                    category?.children?.length === 0
                      ? "sub_cat_container hide"
                      : "sub_cat_container"
                  }
                >
                  {category?.children?.length > 0 &&
                    category?.children?.map((subCat, index) => {
                      return (
                        <div key={index} className="sub_main_cat">
                          <Link href={`/search?category=${subCat?.slug}`}>
                            <p className="sub_category_name">{subCat?.name}</p>
                          </Link>

                          <ul>
                            {subCat?.children.length > 0 &&
                              subCat.children?.map((subCatL2, indexL2) => {
                                return (
                                  <li key={indexL2}>
                                    <Link
                                      href={`/search?category=${subCatL2?.slug}`}
                                    >
                                      <p>{subCatL2?.name}</p>
                                    </Link>
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                      );
                    })}
                </div>
              </li>
            );
          })}
      </div>
    </div>
  );
};

export default CategoriesList;
