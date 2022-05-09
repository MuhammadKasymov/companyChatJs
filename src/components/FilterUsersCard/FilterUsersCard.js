import React from "react";
import styles from "./FilterUsersCard.module.scss";
import Frame from "../Frame/Frame";
import InputWithHeader from "../InputWithHeader/InputWithHeader";
import { userFilter } from "../../constants/initialStates/filterStates";
import { userFilterTypes } from "../../constants/types/pageTypes/UserFriendsFiltersConstants";
import MinMaxInputs from "../MinMaxInputs/MinMaxInputs";

const FilterUsersCard = ({ confirmFilters }) => {
  const newFilters = Object(userFilter);

  const onConfirm = () => confirmFilters(newFilters);
  const setFilters = (typeData, value) => (newFilters[typeData] = value);
  const typedSetFilter = (typeData) => (value) => setFilters(typeData, value);

  return (
    <Frame style={styles.container}>
      <InputWithHeader
        style={styles.textInput}
        maxLength={18}
        onInput={typedSetFilter(userFilterTypes.login)}
        headerText={"Логин"}
      />
      <InputWithHeader
        style={styles.textInput}
        maxLength={18}
        onInput={typedSetFilter(userFilterTypes.name)}
        headerText={"ФИО"}
      />
      <div className={styles.ageContainer}>
        <h2 className={styles.headerText}>Возраст</h2>
        <MinMaxInputs
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
