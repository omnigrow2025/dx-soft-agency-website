import { useMemo, useState, type FC } from "react";
import { MdDelete } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useGetPartners } from "./api/hooks/useGetPartners";
import { useDeletePartner } from "./api/hooks/useDeletePartner";
import { TableLayout } from "../../../../../../components/TableLayout";
import { ConfirmModal } from "../../../../../../../../common/components/ConfirmModal";
import { GET_PARTNERS_QUERY_KEY } from "./api/constants/queryKeys";
import type { GetPartnerModel } from "./models/getPartner.model";
import { CreatePartner } from "./components/CreatePartner";
import {
  DEFAULT_PAGE,
  IMAGE_SRC,
  queryNames,
} from "../../../../../../../../common/constants/constants";
import { useSearchParams } from "react-router-dom";
import type { PartnersQueryModel } from "./models/partnersQuery.model";
import { ImageModal } from "../../../../../../../../common/components/ImageModal";
import { FaLink } from "react-icons/fa";

export const Partners: FC = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const [openDeleteModal, setOpenDeleteModal] =
    useState<null | GetPartnerModel>(null);

  const { mutate: deletePartner, isPending } = useDeletePartner();

  const page = searchParams.get(queryNames.page)
    ? Number(searchParams.get(queryNames.page))
    : DEFAULT_PAGE;

  const params = useMemo<PartnersQueryModel>(() => {
    return { page };
  }, [page]);

  const { data, isFetching } = useGetPartners(params);

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

  const handleOpenModal = (partner: GetPartnerModel) => {
    setOpenDeleteModal(partner);
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(null);
  };

  const handleDeletePartner = (id: number) => {
    deletePartner(id, {
      onSuccess: () => {
        enqueueSnackbar("Partner deleted", { variant: "success" });
        queryClient.invalidateQueries({
          queryKey: [GET_PARTNERS_QUERY_KEY],
        });
        handleCloseModal();
      },
      onError: () => {
        enqueueSnackbar("Delete failed", { variant: "error" });
      },
    });
  };

  return (
    <>
      <div className="flex gap-2 w-full py-4 justify-end">
        <CreatePartner />
      </div>

      <TableLayout
        table={
          <table className="table table-sm table-zebra w-full ">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Logo</th>
                <th>URL</th>
                <th align="right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data?.data.length ? (
                data.data.map((el, index) => (
                  <tr key={el.id}>
                    <td>{(page - 1) * countPerPage + index + 1}</td>
                    <td>{el.name}</td>
                    <td>
                      <ImageModal imageUrl={`${IMAGE_SRC}${el.logoUrl}`} />
                    </td>
                    <td>
                      <a
                        className="btn tbn-md btn-circle  btn-ghost"
                        href={el.url}
                        target="_blank"
                      >
                        <FaLink />
                      </a>
                    </td>
                    <td>
                      <div className="flex justify-end items-center gap-2">
                        <button
                          className="btn btn-ghost btn-circle"
                          onClick={() => handleOpenModal(el)}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6">
                    No Partner found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        }
        isLoading={isFetching || isPending}
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
      />

      {openDeleteModal && (
        <ConfirmModal
          isOpen={true}
          onClose={handleCloseModal}
          onConfirm={() => handleDeletePartner(openDeleteModal.id)}
          loading={isPending}
          title="Delete Partner"
          description={`Are you sure you want to delete "${openDeleteModal.name}"?`}
        />
      )}
    </>
  );
};
