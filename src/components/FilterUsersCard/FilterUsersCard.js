import React from "react";
import styles from "./FilterUsersCard.module.scss";
import Frame from "../Frame/Frame";
import InputWithHeader from "../InputWithHeader/InputWithHeader";
import { userFilter } from "../../constants/initialStates/filterStates";
import { userFilterTypes } from "../../constants/types/pageTypes/UserFriendsFiltersConstants";
import ConfirmButton from "../ConfirmButton/ConfirmButton";
import TitledMinMaxInputs from "../TitledMinMaxInputs/TitledMinMaxInputs";

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
      <TitledMinMaxInputs
        maxAge={newFilters.maxAge}
        minAge={newFilters.minAge}
        onTypingMin={typedSetFilter(userFilterTypes.minAge)}
        onTypingMax={typedSetFilter(userFilterTypes.maxAge)}
      />
      <ConfirmButton onConfirm={onConfirm} />
    </Frame>
  );
};

export default FilterUsersCard;
