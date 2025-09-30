import React from "react";

const requestStatus = {
  PENDING: { color: "bg-lightgreen", text: "대기" },
  APPROVED: { color: "bg-yellow-default", text: "승인" },
  REJECTED: { color: "bg-darkgreen-defalt", text: "거절" },
};

function RequestStatus({
  status,
}: {
  status: "PENDING" | "APPROVED" | "REJECTED";
}) {
  return (
    <div className={`rounded-lg px-4 py-3 ${requestStatus[status].color}`}>
      {requestStatus[status].text}
    </div>
  );
}

export default RequestStatus;
