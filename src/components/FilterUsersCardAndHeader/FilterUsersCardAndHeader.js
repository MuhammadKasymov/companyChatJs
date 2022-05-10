import React from "react";
import ComponentHeader from "../ComponentHeader/ComponentHeader";
import FilterUsersCard from "../FilterUsersCard/FilterUsersCard";
import styles from "./FilterUsersCardAndHeader.module.scss";

const FilterUsersCardAndHeader = ({
  confirmFilters,
  filterData,
  headerText,
}) => {
  return (
    <div className={styles.container}>
      <ComponentHeader header={headerText} style={styles.componentHeader} />
      <FilterUsersCard
        filterData={filterData}
        confirmFilters={confirmFilters}
      />
    </div>
  );
};

export default FilterUsersCardAndHeader;
