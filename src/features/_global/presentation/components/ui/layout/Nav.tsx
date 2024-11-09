import type { FC } from "react";
import { createElement, Fragment } from "react";
import type { RemixiconComponentType } from "@remixicon/react";
import { RiArrowRightSLine } from "@remixicon/react";
import { Link } from "react-router-dom";

interface INavItemProps {
  icon?: RemixiconComponentType;
  title: string;
  href?: string;
}

interface INavProps {
  title: string;
  navItems?: INavItemProps[];
}

const Nav: FC<INavProps> = ({ title, navItems }) => {
  return (
    <nav style={{ marginTop: "-188px" }} className="pb-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center" aria-label="Breadcrumb">
          {navItems && (
            <ol className="flex flex-wrap items-center space-x-2">
              {navItems.map((item, index) => {
                if (index === 0) {
                  return (
                    <li key={index}>
                      <div className="flex text-black hover:text-gray-900 items-center gap-x-2">
                        {item.icon &&
                          createElement(item.icon, {
                            className: "h-4 w-4 flex-shrink-0",
                            "aria-hidden": "true",
                          })}
                        <Link
                          to={item.href || ""}
                          className="text-sm sm:text-base font-medium"
                        >
                          {item.title}
                        </Link>
                      </div>
                    </li>
                  );
                }

                return (
                  <Fragment key={index}>
                    <li>
                      <RiArrowRightSLine
                        className="h-4 w-4 flex-shrink-0 text-black"
                        aria-hidden="true"
                      />
                    </li>
                    <li>
                      <div className="flex items-center gap-x-2 text-black hover:text-gray-900">
                        {item.icon &&
                          createElement(item.icon, {
                            className: "h-4 w-4 flex-shrink-0",
                            "aria-hidden": "true",
                          })}
                        <Link
                          to={item.href || ""}
                          className="text-sm sm:text-base font-medium text-black hover:text-gray-900"
                        >
                          {item.title}
                        </Link>
                      </div>
                    </li>
                  </Fragment>
                );
              })}
            </ol>
          )}
        </div>
        <div className="mt-4 grid grid-cols-1 items-start gap-4 sm:grid-cols-1 lg:grid-cols-3 lg:gap-8">
          <div className="grid gap-4 lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
