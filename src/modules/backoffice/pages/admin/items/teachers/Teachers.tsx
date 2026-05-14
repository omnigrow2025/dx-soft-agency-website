import { MdDelete, MdEdit } from "react-icons/md";
import { ImageModal } from "../../../../../../common/components/ImageModal";
import { IMAGE_SRC } from "../../../../../../common/constants/constants";
import { TableLayout } from "../../../../components/TableLayout";
import { useGetTeachers } from "../../../../../../common/api/hooks/useGetTeachers";
import { useNavigate } from "react-router-dom";
import { useDeleteTeacher } from "./api/hooks/useDeleteTeacher";
import { useState } from "react";
import type { GetTeacherModel } from "../../../../../../common/models/getTeacher.model";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import { ConfirmModal } from "../../../../../../common/components/ConfirmModal";
import { GET_TEACHERS_QUERY_KEY } from "../../../../../../common/api/constants/queryKeys";
import { EllipsisTypography } from "../../../../../../common/components/EllipsisTypography";

export const Teachers = () => {
  const [openModal, setOpenModal] = useState<GetTeacherModel | null>(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useDeleteTeacher();
  const { data, isFetching } = useGetTeachers();

  const openDeleteTeacherModal = (data: GetTeacherModel) => {
    setOpenModal(data);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const handleDeleteTeacher = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        enqueueSnackbar("Teacher deleted successfully!", {
          variant: "success",
        });

        queryClient.invalidateQueries({ queryKey: [GET_TEACHERS_QUERY_KEY] });

        setOpenModal(null);
      },

      onError: ({ message }) => {
        enqueueSnackbar(message || "Failed to delete teacher.", {
          variant: "error",
        });
      },
    });
  };

  return (
    <>
      <div className="flex gap-2 w-full  py-4 justify-end">
        <div className="">
          <button
            className="btn btn-success"
            onClick={() => navigate("create")}
          >
            Add
          </button>
        </div>
      </div>

      <TableLayout
        table={
          <table className="table table-sm table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Bio</th>
                <th>Image Url</th>
                <th>Phone Number</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data?.length ? (
                data.map((el, index) => (
                  <tr key={el.id}>
                    <td>{index + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.lastName}</td>
                    <td>{el.email}</td>
                    <td className="max-w-5">
                      <EllipsisTypography>{el.bio}</EllipsisTypography>
                    </td>
                    <td>
                      <ImageModal imageUrl={`${IMAGE_SRC}${el.imageUrl}`} />
                    </td>
                    <td>{el.phoneNumber ?? "--"}</td>
                    <td className="max-w-24">
                      <EllipsisTypography>{el.description}</EllipsisTypography>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          className="btn btn-ghost btn-circle"
                          onClick={() => openDeleteTeacherModal(el)}
                        >
                          <MdDelete />
                        </button>

                        <button
                          className="btn btn-ghost btn-circle"
                          onClick={() => navigate(`update/${el.id}`)}
                        >
                          <MdEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-6">
                    No teachers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        }
        isLoading={isFetching || isPending}
      />

      {openModal && (
        <ConfirmModal
          isOpen={true}
          onClose={handleCloseModal}
          onConfirm={() => handleDeleteTeacher(openModal.id)}
          title="Delete Course"
          description="Are you sure?"
        />
      )}
    </>
  );
};
