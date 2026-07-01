const NotificationFilter = ({
  selectedType,
  setSelectedType,
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <select
        value={selectedType}
        onChange={(e) =>
          setSelectedType(e.target.value)
        }
      >
        <option value="All">All</option>
        <option value="Placement">Placement</option>
        <option value="Result">Result</option>
        <option value="Event">Event</option>
      </select>
    </div>
  );
};

export default NotificationFilter;