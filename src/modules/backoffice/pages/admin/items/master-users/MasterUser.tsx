import { useMemo, type FC, useState, type ChangeEvent } from "react";
import dayjs from "dayjs";
import {
  DATE_FORMAT_MASK,
  DEFAULT_PAGE,
  queryNames,
} from "../../../../../../common/constants/constants";
import { TableLayout } from "../../../../components/TableLayout";
import { useGetMasterUser } from "./api/hooks/useGetMasterUsers";
import type { MasterUserQueryModel } from "./models/masterUsersQuery.model";
import { useSearchParams } from "react-router-dom";
import { RegisterOffer } from "./components/RegisterOffer";

export const MasterUser: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");

  // Get current page from query params
  const page = searchParams.get(queryNames.page)
    ? Number(searchParams.get(queryNames.page))
    : DEFAULT_PAGE;

  // Build params for API
  const params = useMemo<MasterUserQueryModel>(() => {
    const query = searchParams.get(queryNames.query) || "";
    return {
      page,
      countPerPage: null,
      query,
    };
  }, [page, searchParams]);

  const { data, isFetching } = useGetMasterUser(params);

  const countPerPage = 10; // or get from your params/api

  const totalPages = data?.count
    ? Math.ceil(data.count / countPerPage)
    : DEFAULT_PAGE;

  const nextPage = () => {
    if (page < totalPages) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev.toString());
        newParams.set(queryNames.page, String(page + 1));
        return newParams;
      });
    }
  };

  const backPage = () => {
    if (page > 1) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev.toString());
        newParams.set(queryNames.page, String(page - 1));
        return newParams;
      });
    }
  };
  // Search handler
  const onSearch = () => {
    if (searchInput.trim()) {
      searchParams.set(queryNames.query, searchInput.trim());
    } else {
      searchParams.delete(queryNames.query);
    }
    searchParams.set(queryNames.page, String(DEFAULT_PAGE));
    setSearchParams(searchParams);
  };

  const onSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <div className="flex gap-2 w-full  py-4 justify-between">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search users..."
            value={searchInput}
            onChange={onSearchQueryChange}
            className="input input-bordered w-full"
          />

          <button className="btn btn-primary" onClick={onSearch}>
            Search
          </button>
        </div>
        <div>
          <RegisterOffer />
        </div>
      </div>

      <TableLayout
        table={
          <table className="table table-md table-zebra w-full">
            <thead>
              <tr>
                <th className="sticky top-0 bg-base-100 z-10">#</th>
                <th className="sticky top-0 bg-base-100 z-10">Name</th>
                <th className="sticky top-0 bg-base-100 z-10">Last Name</th>
                <th className="sticky top-0 bg-base-100 z-10">Email</th>
                <th className="sticky top-0 bg-base-100 z-10">Created At</th>
                <th className="sticky top-0 bg-base-100 z-10">Updated At</th>
              </tr>
            </thead>

            <tbody>
              {data?.data.length ? (
                data.data.map((el, index) => (
                  <tr key={el.id}>
                    <td>{(page - 1) * countPerPage + index + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.lastName}</td>
                    <td>{el.email}</td>
                    <td>{dayjs(el.createdAt).format(DATE_FORMAT_MASK)}</td>
                    <td>{dayjs(el.updatedAt).format(DATE_FORMAT_MASK)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        }
        footer={
          <div className="join">
            <button className="join-item btn btn-sm" onClick={backPage}>
              «
            </button>
            <button className="join-item btn btn-sm">Page {page}</button>
            <button className="join-item btn btn-sm" onClick={nextPage}>
              »
            </button>
          </div>
        }
        isLoading={isFetching}
      />
    </>
  );
};
