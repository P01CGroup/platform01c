const NumberedList = ({ title, idx }: { title?: string; idx?: number }) => {
  return (
    <div className="border-b border-dark/10 flex items-start gap-10">
      <div className="text-sm py-[20px] ">
        {idx !== undefined && (idx + 1).toString().padStart(2, "0")}.
      </div>
      <div
        className={`flex-1 w-full text-left py-4 flex items-center justify-between `}
        style={{ borderRadius: 0 }}
      >
        <span className="heading-5 select-none">{title}</span>
      </div>
    </div>
  );
};

export default NumberedList;
