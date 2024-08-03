import { useState, useRef, useEffect } from "react";
import { Input } from "antd";
import "antd/dist/reset.css";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "@contexts/SearchContext";
import ResultsMovies from "./ResultsMovies";
import ResultsTv from "./ResultsTv";
import ResultsPeople from "./ResultsPeople";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightDots } from "@fortawesome/free-solid-svg-icons";

const { Search } = Input;

const SearchBar = () => {
  const [isActive, setIsActive] = useState(false);
  const searchRef = useRef(null);
  const tippyRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      if (searchRef.current) {
        // Cập nhật kích thước của searchRef
      }
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (searchRef.current) {
      resizeObserver.observe(searchRef.current);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive]);

  const {
    valueInput,
    setValueInput,
    resultMovies,
    resultTvShows,
    resultPersons,
    resultTrending,
  } = useSearch();

  const handleClickOutside = (e) => {
    if (
      tippyRef.current &&
      !tippyRef.current.contains(e.target) &&
      searchRef.current &&
      !searchRef.current.contains(e.target)
    ) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={searchRef}
        className="relative flex h-7 w-[180px] items-center overflow-hidden rounded-full border border-gray-300 transition-all duration-300 sm:h-8 sm:w-[290px]"
      >
        <Search
          placeholder="Search..."
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          className="w-full border-none"
          style={{ flex: 1, background: "#ccc" }}
          onClick={() => {
            setIsActive(true);
          }}
          allowClear={true}
          onPressEnter={() => navigate("/search")}
        />
      </div>
      {isActive && (
        <Tippy
          placement="bottom-start"
          offset={[0, 10]}
          visible={isActive}
          interactive={true}
          render={(attrs) => (
            <div
              ref={tippyRef}
              className="rounded-lg border border-gray-300 bg-white p-4 text-[1.1vw] text-black shadow-lg"
              style={{ width: searchRef.current?.offsetWidth || "auto" }}
              tabIndex="-1"
              {...attrs}
            >
              {resultMovies.length > 0 ||
              resultTvShows.length > 0 ||
              resultPersons.length > 0 ? (
                <div>
                  {resultMovies.length > 0 && (
                    <ResultsMovies resultMovies={resultMovies} />
                  )}
                  {resultTvShows.length > 0 && (
                    <ResultsTv resultTvShows={resultTvShows} />
                  )}
                  {resultPersons.length > 0 && (
                    <ResultsPeople resultPersons={resultPersons} />
                  )}
                  <Link to={"/search"} className="text-[1.3vw] font-bold">
                    Xem tất cả...
                  </Link>
                </div>
              ) : (
                <div>
                  <h3 className="text-[1.3vw] font-bold">
                    {/* <ArrowUpOutlined /> */}
                    <FontAwesomeIcon
                      icon={faArrowUpRightDots}
                      className="mr-1"
                    />
                    Trending
                  </h3>
                  {resultTrending.slice(0, 5).map((item) => (
                    <ul key={item.id}>
                      <Link to={`/detail/${item.media_type}/${item.id}`}>
                        <li className="py-1">{item.title || item.name}</li>
                      </Link>
                    </ul>
                  ))}
                </div>
              )}
            </div>
          )}
        >
          <div></div>
        </Tippy>
      )}
    </div>
  );
};

export default SearchBar;
