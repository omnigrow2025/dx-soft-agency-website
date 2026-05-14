import { useState, type FC } from "react";
import { TableLayout } from "../../../../components/TableLayout";
import { EllipsisTypography } from "../../../../../../common/components/EllipsisTypography";
import { MdDelete } from "react-icons/md";
import { useGetCategories } from "./api/hooks/useGetCategories";
import { CreateCategoryModal } from "./components/CreateCategoryModal";
import { UpdateCategoryModal } from "./components/UpdateCategoryModal";
import { ConfirmModal } from "../../../../../../common/components/ConfirmModal";
import type { GetCategoryModel } from "../../../../../../common/models/getCategory.model";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteCategory } from "./api/hooks/useDeleteCategory";
import { enqueueSnackbar } from "notistack";
import { GET_CATEGORIES_QUERY_KEY } from "../../../../../../common/api/constants/queryKeys";

export const Categories: FC = () => {
  const { data: categories, isFetching } = useGetCategories();
  const queryClient = useQueryClient();
  const { mutate: deleteCategory, isPending } = useDeleteCategory();
  const [openDeleteModal, setOpenDeleteModal] =
    useState<null | GetCategoryModel>(null);

  const handleCloseModal = () => {
    setOpenDeleteModal(null);
  };

  const handleOpenModal = (data: GetCategoryModel) => {
    setOpenDeleteModal(data);
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategory(id, {
      onSuccess: () => {
        enqueueSnackbar("Category deleted", { variant: "success" });
        queryClient.invalidateQueries({ queryKey: [GET_CATEGORIES_QUERY_KEY] });
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
          <CreateCategoryModal />
        </div>
      </div>

      <TableLayout
        table={
          <table className="table table-sm table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th align="right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.length ? (
                categories.map((el, index) => (
                  <tr key={el.id}>
                    <td>{index + 1}</td>
                    <td>{el.name}</td>
                    <td className="max-w-24">
                      <EllipsisTypography>{el.description}</EllipsisTypography>
                    </td>
                    <td>
                      <div className="flex  justify-end items-center gap-2">
                        <button
                          className="btn btn-ghost btn-circle"
                          onClick={() => handleOpenModal(el)}
                        >
                          <MdDelete />
                        </button>

                        <UpdateCategoryModal data={el} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6">
                    No category found
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
          onConfirm={() => handleDeleteCategory(openDeleteModal.id)}
          loading={isPending}
          title="Delete Category"
          description={`Are you sure you want to delete "${openDeleteModal.name}"?`}
        />
      )}
    </>
  );
};
