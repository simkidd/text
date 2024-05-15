"use client"
import AppModal from "@/components/AppModal";
import { Product } from "@/interfaces/product.interface";
import { useProductStore } from "@/lib/stores/product.store";
import { Button, useDisclosure } from "@nextui-org/react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteProduct: React.FC<{ product: Product }> = ({ product }) => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  return (
    <>
      <AppModal
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalOpenChange}
        title="Confirmation"
        isDismissable={false}
        hideCloseButton
      >
        <DeletePopup onClose={onDeleteModalClose} product={product} />
      </AppModal>
      <button
        className="text-red-500 px-4 py-2 text-sm flex items-center"
        onClick={() => onDeleteModalOpen()}
      >
        <Trash className="mr-2" size={16} />
        Delete
      </button>
    </>
  );
};

export default DeleteProduct;

export const DeletePopup: React.FC<{
  product: Product;
  onClose: () => void;
}> = ({ product, onClose }) => {
  const { loading, deleteProduct } = useProductStore();
  const router = useRouter();

  const handleDelete = async () => {
    await deleteProduct(product?._id);
    onClose();
    router.back();
  };

  return (
    <div className="flex flex-col">
      <p>
        Are you sure you want to delete <b>{product?.name}</b>?
      </p>
      <div className="flex items-center gap-2 mt-8 mb-4 ms-auto">
        <Button
          variant="light"
          color="default"
          className="rounded-md"
          onPress={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="solid"
          color="danger"
          type="submit"
          className="rounded-md "
          isDisabled={loading}
          isLoading={loading}
          onPress={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
