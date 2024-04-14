"use client";
import { CreateProductInput } from "@/interfaces/product.interface";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { GrCloudUpload } from "react-icons/gr";

const CreateProductForm = () => {
  const [input, setInput] = useState<CreateProductInput>({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: 0,
    additionalInfo: "",
    quantityInStock: 0,
    images: [],
    outsideLocationDeliveryFee: 0,
    withinLocationDeliveryFee: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("input", input);
  };
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1">
        <div className="col-span-1 lg:pr-4">
          <div className="mb-3">
            <label htmlFor="title">Product title</label>
            <input
              type="text"
              id="title"
              className="w-full border focus:outline-none focus:border-primary focus:border h-10 py-2 px-3 bg-transparent mt-1"
              value={input?.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Product description</label>
            <textarea
              name=""
              id="description"
              className="w-full border focus:outline-none focus:border-primary focus:border h-10 py-2 px-3 bg-transparent min-h-28 mt-1 resize-none"
              value={input?.description}
              onChange={(e) =>
                setInput({ ...input, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="mb-3 grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-3">
            <div className="">
              <label htmlFor="category">Category</label>
              <select
                name=""
                id="category"
                className="w-full border focus:outline-none focus:border-primary focus:border h-10 py-2 px-3 bg-transparent cursor-pointer mt-1"
                value={input?.category}
                onChange={(e) =>
                  setInput({ ...input, category: e.target.value })
                }
              >
                <option value="">Batteries</option>
                <option value="">Inverters</option>
              </select>
            </div>
            <div className="">
              <label htmlFor="brand">Brand</label>
              <select
                name=""
                id="brand"
                className="w-full border focus:outline-none focus:border-primary focus:border h-10 py-2 px-3 bg-transparent cursor-pointer mt-1"
                value={input?.brand}
                onChange={(e) => setInput({ ...input, brand: e.target.value })}
              >
                <option value="">Brand 1</option>
                <option value="">Brand 2</option>
              </select>
            </div>
          </div>
          <div className="mb-3 grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-3">
            <div className="">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                className="w-full border focus:outline-none focus:border-primary focus:border h-10 py-2 px-3 bg-transparent mt-1"
                value={input?.price}
                onChange={(e) => {
                  const newValue = e.target.valueAsNumber;
                  if (!isNaN(newValue) && newValue > 0) {
                    setInput({ ...input, price: newValue });
                  }
                }}
              />
            </div>
            <div className="">
              <label htmlFor="stock">Quantity in stock</label>
              <input
                type="number"
                id="stock"
                className="w-full border focus:outline-none focus:border-primary focus:border h-10 py-2 px-3 bg-transparent mt-1"
                value={input?.quantityInStock}
                onChange={(e) => {
                  const newValue = e.target.valueAsNumber;
                  if (!isNaN(newValue) && newValue > 0) {
                    setInput({ ...input, quantityInStock: newValue });
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:pl-4">
          <div className="mb-3">
            <label htmlFor="" className="">
              Images
            </label>
            <div className="flex gap-2 flex-wrap mt-1">
              {/* selected images */}
              <div className="size-20 overflow-hidden rounded relative group">
                <Image src="" alt="" className="w-full h-full object-cover" />
                <div
                  className="bg-[#2424243a] w-full h-full absolute top-0 left-0 flex group-hover:opacity-100 opacity-0"
                  style={{ transition: "opacity .3s ease" }}
                >
                  <button className="mt-auto ml-[50%] -translate-x-1/2 mb-1 text-white bg-danger p-1 rounded">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              {/* upload button */}
              <div
                className="size-20 overflow-hidden rounded border hover:bg-gray-400"
                style={{ transition: "background .3s ease" }}
              >
                <label htmlFor="image" className="cursor-pointer">
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <GrCloudUpload size={20} />
                    <span className="text-sm">Upload</span>
                  </div>
                </label>
                <input type="file" id="image" className="hidden" />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="information">Additional Information</label>
            <textarea
              name=""
              id="information"
              className="w-full border focus:outline-none focus:border-primary focus:border h-10 py-2 px-3 bg-transparent min-h-28 mt-1 resize-none"
            ></textarea>
          </div>
          <h4 className="text-lg font-medium mb-2">Delivery fee:</h4>
          <div className="mb-3 grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-3">
            <div className="">
              <label htmlFor="within">Within Port Harcourt</label>
              <input
                type="number"
                id="within"
                className="w-full border focus:outline-none focus:border-primary focus:border h-10 py-2 px-3 bg-transparent mt-1"
                value={input?.withinLocationDeliveryFee}
                onChange={(e) => {
                  const newValue = e.target.valueAsNumber;
                  if (!isNaN(newValue) && newValue > 0) {
                    setInput({ ...input, withinLocationDeliveryFee: newValue });
                  }
                }}
              />
            </div>
            <div className="">
              <label htmlFor="outside">Outside Port Harcourt</label>
              <input
                type="number"
                id="outside"
                className="w-full border focus:outline-none focus:border-primary focus:border h-10 py-2 px-3 bg-transparent mt-1"
                value={input?.outsideLocationDeliveryFee}
                onChange={(e) => {
                  const newValue = e.target.valueAsNumber;
                  if (!isNaN(newValue) && newValue > 0) {
                    setInput({
                      ...input,
                      outsideLocationDeliveryFee: newValue,
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-6">
          <input
            type="checkbox"
            name=""
            id="publish"
            className="accent-current mr-1 cursor-pointer"
          />
          <label htmlFor="publish" className="cursor-pointer">
            Publish on site
          </label>
        </div>
        <button className="bg-primary text-white px-6 py-2">Add Product</button>
      </div>
    </form>
  );
};

export default CreateProductForm;
