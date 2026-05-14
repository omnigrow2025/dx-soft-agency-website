import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import { useMemo, useState, type ChangeEvent } from "react";
import { FaTrash } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { ConfirmModal } from "../../../../../../common/components/ConfirmModal";
import {
  DATE_FORMAT_MASK,
  DEFAULT_PAGE,
  queryNames,
} from "../../../../../../common/constants/constants";
import { TableLayout } from "../../../../components/TableLayout";
import { GET_ENROLLMENTS_QUERY_KEY } from "./api/constants/queryKeys";
import { useDeleteEnrollment } from "./api/hooks/useDeleteEnrollment";
import { useGteEnrollments } from "./api/hooks/useGetEnrollments";
import type { EnrollmentsListQueryOptionModel } from "./models/enrollmentsQuery.model";
import type { GetEnrollmentModel } from "./models/getEnrollment.model";

export const Enrollments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");

  const queryClient = useQueryClient();
  const [openDeleteModal, setOpenDeleteModal] =
    useState<null | GetEnrollmentModel>(null);
  const { mutate, isPending } = useDeleteEnrollment();

  const page = searchParams.get(queryNames.page)
    ? Number(searchParams.get(queryNames.page))
    : DEFAULT_PAGE;

  const params = useMemo<EnrollmentsListQueryOptionModel>(() => {
    const query = searchParams.get(queryNames.query) || "";
    const unassignedParam = searchParams.get(queryNames.unassigned);

    return {
      page,
      query,
      unassigned:
        unassignedParam === null ? undefined : unassignedParam === "true",
    };
  }, [page, searchParams]);

  const { data, isFetching } = useGteEnrollments(params);

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

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(null);
  };

  const handleOpenDeleteModal = (data: GetEnrollmentModel) => {
    setOpenDeleteModal(data);
  };

  const handleDeleteEnrollment = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        enqueueSnackbar("Enrollment deleted", { variant: "success" });

        queryClient.invalidateQueries({
          queryKey: [GET_ENROLLMENTS_QUERY_KEY],
        });
      },
      onError: ({ message }) => {
        enqueueSnackbar(message || "Something went wrong. Please try again.", {
          variant: "error",
        });
      },
      onSettled: () => {
        handleCloseDeleteModal();
      },
    });
  };

  return (
    <>
      <div className="flex gap-2 w-full py-4 justify-between">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search Enrollment..."
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
                <th className="sticky top-0 bg-base-100 z-10">ID</th>
                <th className="sticky top-0 bg-base-100 z-10">Fullname</th>
                <th className="sticky top-0 bg-base-100 z-10">Email</th>
                <th className="sticky top-0 bg-base-100 z-10">Phone Number</th>
                <th className="sticky top-0 bg-base-100 z-10">Course Name</th>
                <th className="sticky top-0 bg-base-100 z-10">Created At</th>
                <th className="sticky top-0 bg-base-100 z-10">Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.data.length ? (
                data.data.map((el) => (
                  <tr key={el.id}>
                    <td>{el.id}</td>
                    <td>{el.fullname}</td>
                    <td>{el.email}</td>
                    <td>{el.phoneNumber}</td>
                    <td>{el.course.title}</td>

                    <td>{dayjs(el.createdAt).format(DATE_FORMAT_MASK)}</td>
                    <td>
                      <button
                        className="btn btn-circle btn-ghost btn-sm"
                        onClick={() => handleOpenDeleteModal(el)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    No enrollment found
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
      {openDeleteModal && (
        <ConfirmModal
          isOpen={!!openDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={() => handleDeleteEnrollment(openDeleteModal.id)}
          loading={isPending}
          confirmText="Delete"
          title={"Delete Enrollment"}
          description={`Are you sure you want to delete enrollment "${openDeleteModal.fullname}"?`}
        />
      )}
    </>
  );
};
