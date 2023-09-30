import { HTMLProps, ReactNode, useEffect, useRef, useState } from "react";
import {
  RiArrowDownLine,
  RiArrowUpDownLine,
  RiArrowUpLine,
  RiSearch2Line,
} from "react-icons/ri";
import ReactPaginate from "react-paginate";
import Button from "./form/Button";
import { DropdownItem } from "./dropdown";
import DropdownMenu, { DropdownMenuRefObject } from "./dropdown/DropdownMenu";

export type SortType = {
  label: string;
  value: string;
};

export type SortValue = {
  order: string | undefined;
  direction: "asc" | "desc" | undefined;
};

export type TableData<T, K extends keyof T = keyof T> = {
  key: K | null;
  label?: string;
  render?: (value: T[K] | null, index: number) => ReactNode;
  action?: boolean;
  props?: HTMLProps<HTMLTableCellElement>;
};

export type TableProps<T> = {
  data: T[];
  columns: (TableData<T> | "indexing")[];
  loading?: boolean;
  buttons?: ReactNode;
  pageTotal?: number;
  onPageChanged?: (page: number) => void;
  onSearch?: (query?: string) => void;
  sortValues?: SortType[];
  onSort?: (sort?: SortValue) => void;
};

export default function Table<T>({
  data,
  columns,
  loading,
  buttons,
  pageTotal = 0,
  onPageChanged,
  onSearch,
  onSort,
  sortValues,
}: TableProps<T>) {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(0);
  const [sort, setSort] = useState<SortValue>({
    order: undefined,
    direction: "asc",
  });
  const [search, setSearch] = useState("");
  const _dropdownSort = useRef<DropdownMenuRefObject>();

  useEffect(() => {
    _dropdownSort.current?.close();
  }, [sort]);

  useEffect(() => {
    setPage(0);
  }, [pageTotal]);

  return (
    <div className="flex-1 flex flex-col relative bg-white rounded border border-gray-300 overflow-hidden">
      {(onSearch || sortValues?.length || buttons) && (
        <div className="border-b border-gray-300 flex justify-start items-center h-16">
          {onSearch && (
            <div className="border-r border-gray-300 flex-1 lg:flex-0 w-auto lg:w-1/3 relative h-full">
              <input
                type="text"
                className="w-full h-full px-3 pl-10 lg:pl-12"
                placeholder={"Cari..."}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSearch(search);
                  }
                }}
              />
              <div className="absolute top-0 left-0 h-full w-10 lg:w-12 flex justify-center items-center pointer-events-none">
                <RiSearch2Line />
              </div>
            </div>
          )}
          <div className="flex items-center justify-end ml-auto px-5 space-x-3">
            {sortValues?.length && (
              <div
                className="relative"
                onBlur={(e) => _dropdownSort.current?.onBlur(e)}
              >
                <Button
                  element={"button"}
                  type="button"
                  color="basic"
                  className="flex items-center"
                  onClick={() => _dropdownSort.current?.toggle()}
                >
                  <RiArrowUpDownLine className="text-base lg:text-sm m-0 lg:mr-2" />
                  <span className="hidden lg:block">Urut</span>
                </Button>
                <DropdownMenu ref={_dropdownSort}>
                  <DropdownItem
                    element={"button"}
                    className={sort.order === undefined ? "!bg-gray-100" : ""}
                    onClick={() => {
                      onSort!({
                        order: undefined,
                        direction: sort.direction,
                      });
                      setSort((value) => ({
                        order: undefined,
                        direction: value.direction,
                      }));
                    }}
                  >
                    Default
                  </DropdownItem>
                  {sortValues.map((item, index) => (
                    <DropdownItem
                      key={`${index}`}
                      element={"button"}
                      className={
                        sort.order === item.value ? "!bg-gray-100" : ""
                      }
                      onClick={() => {
                        onSort!({
                          order: item.value,
                          direction: sort.direction,
                        });
                        setSort((value) => ({
                          order: item.value,
                          direction: value.direction,
                        }));
                      }}
                    >
                      {item.label}
                    </DropdownItem>
                  ))}
                  <DropdownItem
                    element={"button"}
                    icon={RiArrowUpLine}
                    className={
                      (sort.direction === "asc" ? "!bg-gray-100" : "") +
                      " border-t border-gray-300"
                    }
                    onClick={() => {
                      onSort!({
                        order: sort.order,
                        direction: "asc",
                      });
                      setSort((value) => ({
                        order: value.order,
                        direction: "asc",
                      }));
                    }}
                  >
                    Naik
                  </DropdownItem>
                  <DropdownItem
                    element={"button"}
                    icon={RiArrowDownLine}
                    className={sort.direction === "desc" ? "!bg-gray-100" : ""}
                    onClick={() => {
                      onSort!({
                        order: sort.order,
                        direction: "desc",
                      });
                      setSort((value) => ({
                        order: value.order,
                        direction: "desc",
                      }));
                    }}
                  >
                    Turun
                  </DropdownItem>
                </DropdownMenu>
              </div>
            )}
            {buttons}
          </div>
        </div>
      )}
      <div className="relative flex-1 -z-0">
        <div className="absolute top-0 left-0 w-full h-full overflow-auto">
          <table
            className="min-w-full border-collapse"
            style={{ maxWidth: 9000 }}
          >
            <thead className="sticky top-0 bg-white z-10 shadow shadow-gray-300">
              <tr>
                {columns.map((item, index) => (
                  <th
                    className="py-4 pl-5 pr-8 text-left whitespace-nowrap text-sm"
                    key={`${index}`}
                    {...(item !== "indexing" && item.props ? item.props : {})}
                  >
                    {item === "indexing"
                      ? "#"
                      : item.label || (item.key as string)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={`${rowIndex}`}
                  className="bg-transparent hover:bg-gray-100 group border-b"
                >
                  {columns.map((item, index) => (
                    <td
                      key={`${index}`}
                      className={`py-4 px-5 text-sm ${
                        item !== "indexing" && item.action
                          ? "sticky right-0 bg-white group-hover:bg-gray-100 flex justify-end items-center space-x-2 text-sm"
                          : ""
                      }`}
                      {...(item !== "indexing" && item.props ? item.props : {})}
                    >
                      {item === "indexing"
                        ? page * limit + rowIndex + 1
                        : item.key
                        ? !item.render
                          ? (row[item.key!] as ReactNode)
                          : item.render(row[item.key!], rowIndex)
                        : item.render!(null, rowIndex)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ReactPaginate
        className="flex flex-wrap justify-center lg:justify-end items-center space-x-2 py-2 px-5 bg-white"
        previousLinkClassName="inline-block w-10 h-10 flex justify-center items-center bg-primary-100 text-primary-800 border border-primary-300 rounded text-sm font-normal my-1"
        nextLinkClassName="inline-block w-10 h-10 flex justify-center items-center bg-primary-100 text-primary-800 border border-primary-300 rounded text-sm font-normal my-1"
        pageLinkClassName="inline-block w-10 h-10 flex justify-center items-center bg-primary-100 text-primary-800 border border-primary-300 rounded text-sm font-normal my-1"
        activeLinkClassName="!bg-gray-100 !border-gray-300 !text-gray-600"
        pageCount={pageTotal > 1 ? pageTotal : 0}
        breakLabel="..."
        nextLabel="&raquo;"
        onPageChange={({ selected }) => {
          if (limit === 0) {
            setLimit(data.length);
          }
          setPage(selected);
          onPageChanged ? onPageChanged(selected + 1) : undefined;
        }}
        forcePage={pageTotal > 1 ? page : -1}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        previousLabel="&laquo;"
        renderOnZeroPageCount={null}
      />

      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex justify-center items-center">
          <div className="py-5 px-8 bg-white rounded">Tunggu...</div>
        </div>
      )}
    </div>
  );
}
