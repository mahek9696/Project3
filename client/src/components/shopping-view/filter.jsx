import { Fragment } from "react";
import { filterOptions } from "@/config";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "../ui/checkbox";

function ProductFilter() {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h1 className="text-lg font-semibold">Filters</h1>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment>
            <div>
              <h2 className="text-base font-bold">{keyItem}</h2>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label className="flex font-medium items-center gap-2">
                    <Checkbox />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
