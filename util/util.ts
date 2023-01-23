import {ethers} from "ethers";

export function toArrayOfObjects(csvRows, csvHeader) {
  const array = csvRows.map(i => {
    const values = i.trim().split(",");
    const obj = csvHeader.reduce((object, header, index) => {
      object[header] = values[index];
      return object;
    }, {});
    return obj;
  });
  return array;
}

export function toRecipientsAndAmountsArrays(csvRows) {
  return csvRows.reduce(([a, b]: any, subarray: any) => {
    const [recipient, amount] = subarray.trim().split(",")
    a.push(recipient);
    let ERC_TOKEN_FORMAT = "ether";
    b.push(ethers.utils.parseUnits(amount, ERC_TOKEN_FORMAT));
    return [a, b];
  }, [[], []]);
}