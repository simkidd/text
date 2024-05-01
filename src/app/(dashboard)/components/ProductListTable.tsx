"use client";
import { Spinner } from "@nextui-org/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable, {
  TableColumn,
  createTheme,
} from "react-data-table-component";
import { customStyles } from "./UI/tableStyle";
import { Product } from "@/interfaces/product.interface";
import { Trash } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import Image from "next/image";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { useProductStore } from "@/lib/stores/product.store";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

createTheme(
  "light",
  {
    text: {
      primary: "inherit",
      // secondary: '',
    },
    background: {
      default: "transparent",
    },
    // context: {
    // 	background: '#cb4b16',
    // 	text: '#FFFFFF',
    // },
    // divider: {
    // 	default: '#073642',
    // },
    // button: {
    // 	default: '#2aa198',
    // 	hover: 'rgba(0,0,0,.08)',
    // 	focus: 'rgba(255,255,255,.12)',
    // 	disabled: 'rgba(255, 255, 255, .34)',
    // },
    // sortFocus: {
    // 	default: '#2aa198',
    // },
  }
  // "dark"
);

const columns: TableColumn<Product>[] = [
  {
    name: "Product",
    cell: (row) => (
      <div className="grid grid-cols-[55px_auto] gap-2 w-full py-2">
        <div className="w-[55px] h-[55px]">
          <Image
            src={row?.images[0].url}
            alt={row?.name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <Link href={`/admin/products/${row?._id}`}>
          <span className="text-wrap">{row?.name}</span>
        </Link>
      </div>
    ),
    minWidth: "400px",
  },
  {
    name: "Price",
    cell: (row) => <div>{formatCurrency(row?.price, "NGN")}</div>,
    minWidth: "150px",
  },
  {
    name: "Quantity",
    cell: (row) => <div>{row?.quantityInStock}</div>,
  },
  {
    name: "Category",
    cell: (row) => <div>{row?.category?.name}</div>,
  },
  {
    name: "Brand",
    cell: (row) => <div>{row?.brand}</div>,
  },
  {
    name: "Published",
    cell: (row) => (
      <div>{row?.isPublished ? <span>Yes</span> : <span>No</span>}</div>
    ),
  },
  {
    name: "Date added",
    cell: (row) => <div>{formatDate(row?.createdAt)}</div>,
    minWidth: "150px",
  },
  {
    name: "Actions",
    cell: (row) => (
      <div className="w-full flex items-center justify-center">
        <button>
          <Trash size={16} />
        </button>
      </div>
    ),
    width: "80px",
  },
];

const ProductListTable = () => {
  const { products, setProducts } = useProductStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/products");
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredProducts = useMemo(() => {
    let selectedProducts = [...products];

    if (searchTerm) {
      selectedProducts = selectedProducts.filter((product) =>
        product?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return selectedProducts;
  }, [products, searchTerm]);

  const handleSearch = useCallback(
    (value?: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("q", value);
        setSearchTerm(value);
      } else {
        params.delete("q");
        setSearchTerm("");
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );

  return (
    <div>
      <div className="flex items-center py-4 px-4">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent border focus:outline-none px-2 py-1 w-full max-w-md text-sm rounded-md shadow-sm"
          value={searchTerm}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("q")?.toString()}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredProducts}
        progressPending={loading}
        progressComponent={
          <div className="py-8">
            <Spinner />
          </div>
        }
        pagination
        selectableRows
        // actions={<button className="">Export PDF</button>}
        // fixedHeader
        selectableRowsHighlight
        highlightOnHover
        // subHeader
        customStyles={customStyles}
        theme="light"
      />
    </div>
  );
};

export default ProductListTable;
