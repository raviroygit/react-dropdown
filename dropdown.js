import React, { useEffect, useState } from 'react';
import SelectWrapper from './selectWraper';
import { getProjectList } from '../../apis/apis';

function Dropdown() {
  const [options, setOptions] = useState([]);
  const [pageNo, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setNextPageLoading] = useState(false);
  const [selectedValue, setSelectedOption] = useState('');

  const loadOptions = async (res) => {
    try {
      const dataOptions = res.data.map(({ _id, name }) => (
        {
          label: name,
          value: _id
        }
      ));
      setNextPageLoading(true);
      const itemsData = options.concat(dataOptions);
      setOptions(itemsData);
      setNextPageLoading(false);
      setHasNextPage(itemsData.length < res.totalPassengers);
    } catch (err) {
      console.log(err); // eslint-disable
    }
  };

  const loadNextPage = async () => {
    const params = {
      page: pageNo === 0 ? pageNo : pageNo + 1,
      size: 10
    };
    setNextPageLoading(true);
    setPage(pageNo + 1);
    // Api call and get list data
    await getProjectList(params, loadOptions);
  };

  return (
    <div className="App">
      <div className="dropdown">
        <div className="label"><label>Passenger name</label></div>
        <SelectWrapper
          value={selectedValue}
          placeholder="Search"
          isClearable
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          options={options}
          loadNextPage={loadNextPage}
          onChange={(selected) => setSelectedOption(selected)}
        />
      </div>
    </div>
  );
}

export default Dropdown;