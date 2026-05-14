import { useState, type FC } from "react";
import { useChangeCourseState } from "../api/hooks/useChangeCourseState";
import { ConfirmModal } from "../../../../../../../common/components/ConfirmModal";

interface StateToggleSwitchProps {
  id: string;
  name: string;
  state: boolean;
  disabled?: boolean;
}

export const StateToggleSwitch: FC<StateToggleSwitchProps> = ({
  id,
  name,
  state,
  disabled = false,
}) => {
  const [value, setValue] = useState(state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingState, setPendingState] = useState<boolean>(state);

  const { mutate, isPending: isLoading } = useChangeCourseState(id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = e.target.checked;
    setPendingState(newState);
    setIsModalOpen(true); // open confirm modal
  };

  const handleConfirm = () => {
    mutate(
      { state: pendingState },
      {
        onSuccess: () => {
          setValue(pendingState);
          setIsModalOpen(false);
        },
        onError: () => {
          setPendingState(value);
          setIsModalOpen(false);
        },
      },
    );
  };

  const handleCancel = () => {
    setPendingState(value);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <div
          className="tooltip tooltip-primary tooltip-bottom"
          data-tip={pendingState ? "Active" : "Inactive"}
        >
          <input
            id={id}
            name={name}
            disabled={disabled}
            type="checkbox"
            checked={pendingState}
            onChange={handleChange}
            className="toggle toggle-primary"
            aria-label={`Toggle ${name} state`}
          />
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        cancelText="Cancel"
        confirmText="Confirm"
        description={`You are about to ${pendingState ? "activate" : "deactivate"} this course.`}
        title="Confirm Action"
        loading={isLoading}
      />
    </>
  );
};
