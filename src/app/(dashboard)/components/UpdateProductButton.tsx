"use client";
import AppModal from "@/components/AppModal";
import UpdateProductForm from "./UpdateProductForm";
import { Button, useDisclosure } from "@nextui-org/react";
import { Edit, Plus } from "lucide-react";
import { Category, Product } from "@/interfaces/product.interface";
import { useProductStore } from "@/lib/stores/product.store";
import { useState } from "react";

const UpdateProductButton: React.FC<{
  product: Product;
}> = ({ product }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isPublishOpen,
    onOpen: onPublishOpen,
    onOpenChange: onPublishOpenChange,
    onClose: onPublishClose,
  } = useDisclosure();

  return (
    <div className="flex items-center gap-2">
      <AppModal
        isOpen={isPublishOpen}
        onOpenChange={onPublishOpenChange}
        title=""
        isDismissable={false}
        hideCloseButton
        size="md"
        scrollBehavior="inside"
      >
        <PublishPopup product={product} onClose={onPublishClose} />
      </AppModal>

      <Button
        size="sm"
        variant="faded"
        color="default"
        type="submit"
        className="rounded-md "
        startContent={<Edit size={16} />}
        onPress={onPublishOpen}
      >
        {product.isPublished ? "Unpublish" : "Publish"}
      </Button>
      <AppModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Update Product"
        isDismissable={false}
        hideCloseButton
        size="4xl"
        scrollBehavior="inside"
      >
        <UpdateProductForm onClose={onClose} product={product} />
      </AppModal>

      <Button
        size="sm"
        variant="solid"
        color="primary"
        type="submit"
        className="rounded-md "
        startContent={<Edit size={16} />}
        onPress={onOpen}
      >
        Update
      </Button>
    </div>
  );
};

export default UpdateProductButton;

export const PublishPopup: React.FC<{
  product: Product;
  onClose: () => void;
}> = ({ onClose, product }) => {
  const { loading, updateProduct } = useProductStore();
  const [input, setInput] = useState({
    productId: product?._id,
    isPublished: product?.isPublished,
  });

  const handlePublish = async () => {
    const newPublishState = !input.isPublished;
    setInput((prevInput) => ({ ...prevInput, isPublished: newPublishState }));

    await updateProduct({ ...input, isPublished: newPublishState });
    onClose();
  };

  return (
    <div className="flex flex-col">
      <p>
        {input.isPublished ? "Unpublish" : "Publish"} <b>{product?.name}</b>?
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
          onPress={handlePublish}
        >
          Yes, {input.isPublished ? "unpublish" : "publish"}
        </Button>
      </div>
    </div>
  );
};
