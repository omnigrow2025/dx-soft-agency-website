import { useState, type FC } from "react";
import { MdDelete } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useGetFaq } from "./api/hooks/useGetFaq";
import { useDeleteFaq } from "./api/hooks/useDeleteFaq";
import { EllipsisTypography } from "../../../../../../../../common/components/EllipsisTypography";
import { CreateFaq } from "./components/CreateFaq";
import { TableLayout } from "../../../../../../components/TableLayout";
import { UpdateFaq } from "./components/UpdateFaq";
import { ConfirmModal } from "../../../../../../../../common/components/ConfirmModal";
import type { GetFaqModel } from "./models/getFaq.model";
import { GET_FAQ_QUERY_KEY } from "./api/constants/queryKeys";

export const Faq: FC = () => {
  const { data: faq, isFetching } = useGetFaq();
  const queryClient = useQueryClient();
  const { mutate: deleteFaq, isPending } = useDeleteFaq();
  const [openDeleteModal, setOpenDeleteModal] = useState<null | GetFaqModel>(
    null,
  );

  const handleCloseModal = () => {
    setOpenDeleteModal(null);
  };

  const handleOpenModal = (data: GetFaqModel) => {
    setOpenDeleteModal(data);
  };

  const handleDeleteFaq = (id: number) => {
    deleteFaq(id, {
      onSuccess: () => {
        enqueueSnackbar("FAQ deleted", { variant: "success" });
        queryClient.invalidateQueries({ queryKey: [GET_FAQ_QUERY_KEY] });
        handleCloseModal();
      },
      onError: () => {
        enqueueSnackbar("Delete failed", { variant: "error" });
      },
    });
  };
  return (
    <>
      <div className="flex gap-2 w-full  py-4 justify-end">
        <div>
          <CreateFaq />
        </div>
      </div>

      <TableLayout
        table={
          <table className="table table-sm table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Answer</th>
                <th align="right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faq.length ? (
                faq.map((el, index) => (
                  <tr key={el.id}>
                    <td>{index + 1}</td>
                    <td>{el.question}</td>
                    <td className="max-w-90">
                      <EllipsisTypography>{el.answer}</EllipsisTypography>
                    </td>
                    <td>
                      <div className="flex  justify-end items-center gap-2">
                        <button
                          className="btn btn-ghost btn-circle"
                          onClick={() => handleOpenModal(el)}
                        >
                          <MdDelete />
                        </button>

                        <UpdateFaq data={el} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6">
                    No FAQ found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        }
        isLoading={isFetching}
      />

      {openDeleteModal && (
        <ConfirmModal
          isOpen={true}
          onClose={handleCloseModal}
          onConfirm={() => handleDeleteFaq(openDeleteModal.id)}
          loading={isPending}
          title="Delete Faq"
          description={`Are you sure you want to delete "${openDeleteModal.id}"?`}
        />
      )}
    </>
  );
};
