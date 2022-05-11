import React from "react";
import styles from "./FilterUsersCard.module.scss";
import Frame from "../Frame/Frame";
import InputWithHeader from "../InputWithHeader/InputWithHeader";
import { userFilter } from "../../constants/initialStates/filterStates";
import { userFilterTypes } from "../../constants/types/pageTypes/UserFriendsFiltersConstants";
import MinMaxInputs from "../MinMaxInputs/MinMaxInputs";

const FilterUsersCard = ({ confirmFilters, filterData }) => {
  const newFilters = Object(filterData) || Object(userFilter);

  const onConfirm = () => confirmFilters(newFilters);
  const setFilters = (typeData, value) => (newFilters[typeData] = value);
  const typedSetFilter = (typeData) => (value) => setFilters(typeData, value);

  return (
    <Frame style={styles.container}>
      <InputWithHeader
        intialValue={newFilters.login || ""}
        style={styles.textInput}
        maxLength={18}
        onInput={typedSetFilter(userFilterTypes.login)}
        headerText={"Логин"}
      />
      <InputWithHeader
        intialValue={newFilters.name || ""}
        style={styles.textInput}
        maxLength={18}
        onInput={typedSetFilter(userFilterTypes.name)}
        headerText={"ФИО"}
      />
      <div className={styles.ageContainer}>
        <h2 className={styles.headerText}>Возраст</h2>
        <MinMaxInputs
          maxValue={newFilters.maxAge || ""}
          minValue={newFilters.minAge || ""}
          onMinInput={typedSetFilter(userFilterTypes.minAge)}
          onMaxInput={typedSetFilter(userFilterTypes.maxAge)}
        />
      </div>

      <button className={styles.confirmBtn} onClick={onConfirm}>
        Применить
      </button>
    </Frame>
  );
};

export default FilterUsersCard;
