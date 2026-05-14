import { useSearchParams } from "react-router-dom";
import { TableLayout } from "../../../../components/TableLayout";
import { useMemo, useState, type ChangeEvent } from "react";
import {
  DATE_FORMAT_MASK,
  DEFAULT_PAGE,
  queryNames,
} from "../../../../../../common/constants/constants";
import type { SupportRequestsQueryModel } from "./models/supportRequestsQuery.model";
import dayjs from "dayjs";
import { useGetSupportRequests } from "./api/hooks/useGetSupportRequests";
import { MdOutlineMessage } from "react-icons/md";
// import { MdClose } from "react-icons/md";

export const SupportRequests = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null); // Modal state

  // Get current page from query params
  const page = searchParams.get(queryNames.page)
    ? Number(searchParams.get(queryNames.page))
    : DEFAULT_PAGE;

  // Build params for API
  const params = useMemo<SupportRequestsQueryModel>(() => {
    const query = searchParams.get(queryNames.query) || "";
    const unassignedParam = searchParams.get(queryNames.unassigned);

    return {
      page,
      query,
      unassigned:
        unassignedParam === null ? undefined : unassignedParam === "true",
    };
  }, [page, searchParams]);

  const { data, isFetching } = useGetSupportRequests(params);

  const countPerPage = 20;
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
    const newParams = new URLSearchParams(searchParams.toString());
    if (searchInput.trim()) {
      newParams.set(queryNames.query, searchInput.trim());
    } else {
      newParams.delete(queryNames.query);
    }
    newParams.set(queryNames.page, String(DEFAULT_PAGE));
    setSearchParams(newParams);
  };

  const onSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleCloseMessageModal = () => {
    setSelectedMessage(null);
  };

  const handleOpenMessageModal = (message: string) => {
    setSelectedMessage(message);
  };

  return (
    <>
      <div className="flex gap-2 w-full py-4 justify-between">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search request..."
            value={searchInput}
            onChange={onSearchQueryChange}
            className="input input-bordered w-full"
          />
          <button className="btn btn-primary" onClick={onSearch}>
            Search
          </button>
        </div>
      </div>

      <TableLayout
        table={
          <table className="table table-md table-zebra w-full">
            <thead>
              <tr>
                <th className="sticky top-0 bg-base-100 z-10">#</th>
                <th className="sticky top-0 bg-base-100 z-10">ID</th>
                <th className="sticky top-0 bg-base-100 z-10">Fullname</th>
                <th className="sticky top-0 bg-base-100 z-10">Email</th>
                <th className="sticky top-0 bg-base-100 z-10">Phone Number</th>
                <th className="sticky top-0 bg-base-100 z-10">Message</th>
                <th className="sticky top-0 bg-base-100 z-10">Created At</th>
              </tr>
            </thead>

            <tbody>
              {data?.data.length ? (
                data.data.map((el, index) => (
                  <tr key={el.id}>
                    <td>{(page - 1) * countPerPage + index + 1}</td>
                    <td>{el.id}</td>
                    <td>{el.fullname}</td>
                    <td>{el.email}</td>
                    <td>{el.phoneNumber}</td>
                    <td>
                      <button
                        disabled={!el.message}
                        className="btn btn-ghost btn-sm btn-circle"
                        onClick={() => handleOpenMessageModal(el.message)}
                      >
                        <MdOutlineMessage />
                      </button>
                    </td>
                    <td>{dayjs(el.createdAt).format(DATE_FORMAT_MASK)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    No support requests found
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

      {/* Message Modal */}
      {selectedMessage && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <h3 className="text-lg font-bold">Message</h3>
            <p className="py-4 whitespace-pre-wrap">{selectedMessage}</p>
            <div className="modal-action">
              <button className="btn" onClick={handleCloseMessageModal}>
                Close
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={handleCloseMessageModal} />
        </div>
      )}
    </>
  );
};
