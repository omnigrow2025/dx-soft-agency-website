import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useMemo, useState, type ChangeEvent, type FC } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";
import { GoListUnordered } from "react-icons/go";
import { MdClear, MdDelete, MdEdit } from "react-icons/md";
import { VscListOrdered } from "react-icons/vsc";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ConfirmModal } from "../../../../../../common/components/ConfirmModal";
import {
  DEFAULT_PAGE,
  IMAGE_SRC,
  queryNames,
} from "../../../../../../common/constants/constants";
import { TableLayout } from "../../../../components/TableLayout";
import { useDeleteCourse } from "./api/hooks/useDeleteCourse";
import { useGetCourses } from "./api/hooks/useGetCourses";
import { FeaturesModal } from "./components/FeaturesModal";
import { StudyPlanModal } from "./components/StudyPlanModal";
import type { CoursesQueryModel } from "./models/coursesQuery.model";
import type { GetCourseModel } from "../../../../../../common/models/getCourse.model";
import { ImageModal } from "../../../../../../common/components/ImageModal";
import { GET_COURSES_QUERY_KEY } from "./api/constants/queryKeys";
import { StateToggleSwitch } from "./components/StateToggleSwitch";
import { EllipsisTypography } from "../../../../../../common/components/EllipsisTypography";

type ModalTypes = "features" | "studyPlan" | "delete";

export const Courses: FC = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<
    Record<ModalTypes, null | GetCourseModel>
  >({ features: null, studyPlan: null, delete: null });
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  // Get current page from query params
  const page = searchParams.get(queryNames.page)
    ? Number(searchParams.get(queryNames.page))
    : DEFAULT_PAGE;

  // Build params for API
  const params = useMemo<CoursesQueryModel>(() => {
    const query = searchParams.get(queryNames.query) || "";
    const unassignedParam = searchParams.get(queryNames.unassigned);

    return {
      page,
      query,
      unassigned:
        unassignedParam === null ? undefined : unassignedParam === "true",
    };
  }, [page, searchParams]);

  const { data, isFetching } = useGetCourses(params);
  const { mutate: deleteCourse, isPending } = useDeleteCourse();

  const countPerPage = 10;

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

  const handleCloseModal = () => {
    setOpenModal({
      features: null,
      studyPlan: null,
      delete: null,
    });
  };

  const handleOpenModal = (type: ModalTypes, data: GetCourseModel) => {
    setOpenModal((prev) => ({ ...prev, [type]: data }));
  };

  const onSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleDeleteCourse = (id: string) => {
    deleteCourse(id, {
      onSuccess: () => {
        enqueueSnackbar("Course deleted successfully", {
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: [GET_COURSES_QUERY_KEY] });
        handleCloseModal();
      },
      onError: ({ message }) => {
        enqueueSnackbar(message || "Failed to delete course", {
          variant: "error",
        });
      },
    });
  };

  return (
    <>
      <div className="flex gap-2 w-full  py-4 justify-between">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search course..."
            value={searchInput}
            onChange={onSearchQueryChange}
            className="input input-bordered w-full"
          />

          <button className="btn btn-primary" onClick={onSearch}>
            Search
          </button>
        </div>
        <div>
          <button
            className="btn btn-success btn-circle"
            onClick={() => navigate("create")}
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <TableLayout
        table={
          <table className="table table-sm  table-zebra w-full" align="center">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Image</th>
                <th>Level</th>
                <th>Price</th>
                <th>Sale Price</th>
                <th>Duration</th>
                <th>Currency</th>
                <th>Type</th>
                <th>Practical</th>
                <th>Certificate</th>
                <th>Description</th>
                <th>Is Group</th>
                <th>Features & Study Plan</th>
                <th>State</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.data.length ? (
                data.data.map((el, index) => (
                  <tr key={el.id}>
                    <td>{(page - 1) * countPerPage + index + 1}</td>
                    <td className="max-w-xs">
                      <EllipsisTypography>{el.title}</EllipsisTypography>
                    </td>
                    <td>
                      <ImageModal imageUrl={`${IMAGE_SRC}${el.imageUrl}`} />
                    </td>
                    <td className="max-w-16">
                      <EllipsisTypography>{el.level}</EllipsisTypography>
                    </td>
                    <td>{el.price}</td>
                    <td>{el.salePrice ?? "--"}</td>
                    <td>{el.duration}</td>
                    <td className="max-w-10">
                      <EllipsisTypography>{el.currency}</EllipsisTypography>
                    </td>
                    <td className="max-w-10">
                      <EllipsisTypography>{el.type}</EllipsisTypography>
                    </td>
                    <td className="max-w-24">
                      <EllipsisTypography>{el.practical}</EllipsisTypography>
                    </td>
                    <td className="max-w-24">
                      <EllipsisTypography>{el.certificate}</EllipsisTypography>
                    </td>
                    <td className="max-w-24">
                      <EllipsisTypography>{el.description}</EllipsisTypography>
                    </td>
                    <td align="center">
                      {el.isGroup ? <FaCheck /> : <MdClear />}
                    </td>
                    <td>
                      <button
                        className="btn btn-circle btn-ghost"
                        onClick={() => handleOpenModal("features", el)}
                      >
                        <GoListUnordered />
                      </button>

                      <button
                        className="btn btn-ghost btn-circle"
                        onClick={() => handleOpenModal("studyPlan", el)}
                      >
                        <VscListOrdered />
                      </button>
                    </td>
                    <td>
                      <StateToggleSwitch
                        disabled={!el.teacherId}
                        id={el.id}
                        name={el.title}
                        state={el.state}
                      />
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          className="btn btn-ghost btn-circle"
                          onClick={() => handleOpenModal("delete", el)}
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
                  <td colSpan={14} className="text-center py-6">
                    No courses found
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
        isLoading={isFetching || isPending}
      />
      {openModal.features && (
        <FeaturesModal
          features={openModal.features.features}
          isOpen={!!openModal.features}
          onClose={handleCloseModal}
        />
      )}
      {openModal.studyPlan && (
        <StudyPlanModal
          studyPlan={openModal.studyPlan.studyPlan}
          isOpen={!!openModal.studyPlan}
          onClose={handleCloseModal}
        />
      )}

      {openModal.delete && (
        <ConfirmModal
          isOpen={true}
          onClose={handleCloseModal}
          onConfirm={() => handleDeleteCourse(openModal.delete!.id)}
          title="Delete Course"
          description="Are you sure?"
        />
      )}
    </>
  );
};
