import { useState, useEffect } from "react";


import Header from "./components/Header/Header";
import Calendar from "./components/Calendar/Calendar";
import Modal from "./components/Modal/Modal";
import ReminderList from "./components/Reminder/ReminderList";

function App() {

  const [editingReminder, setEditingReminder] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeDate, setActiveDate] = useState(null);
  const [selectedDayReminders, setSelectedDayReminders] = useState([]);
  const [reminders, setReminders] = useState(() => {
    const savedReminders = localStorage.getItem("reminders")

    return savedReminders
    ? JSON.parse(savedReminders)
    : [];
  })
  const [currentDate, setCurrentDate] = useState(
    new Date()
  );

  function nextMonth(){

    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );
  }


  function previousMonth(){

    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );
  }

  function goToToday(){

  setCurrentDate(new Date());

}

  function addReminder(reminder) {
    setReminders((prev) => [...prev, reminder]);

    setSelectedDate(null);
    setSelectedDayReminders([]);
  }

  function updateReminder(updatedReminder) {

  setReminders((prev) =>
    prev.map((reminder) =>
      reminder.id === updatedReminder.id
        ? updatedReminder
        : reminder
    )
  );


  setEditingReminder(null);
  setSelectedDate(null);

}

  function deleteReminder(id) {
    setReminders((prev) =>
      prev.filter((reminder) => reminder.id !== id)
    );
  }

  function handleSelectDate(date){

    setActiveDate(date);

    const formattedDate =
      date.toISOString().split("T")[0];


    const remindersOfDay =
      reminders.filter(
        reminder =>
          reminder.date === formattedDate
      );


    if(remindersOfDay.length > 0){

      setSelectedDayReminders(remindersOfDay);

      return;

    }


    setSelectedDate(date);
  }

  function handleNewReminder(){

    setSelectedDayReminders([]);

    setSelectedDate(activeDate);

  }

  useEffect(() => {

  if(selectedDayReminders.length === 0)
    return;


  const updatedList = reminders.filter(
    reminder =>
      reminder.date ===
      selectedDayReminders[0].date
  );


  setSelectedDayReminders(updatedList);


}, [reminders]);



  useEffect(() => {
    localStorage.setItem(
      "reminders",
      JSON.stringify(reminders)
    )
  }, [reminders]);

  return (
    <>
      <Header />

      <Calendar
        reminders={reminders}
        onSelectDate={handleSelectDate}
        onDeleteReminder={deleteReminder}
        currentDate={currentDate}
        onNextMonth={nextMonth}
        onPreviousMonth={previousMonth}
        onToday={goToToday}
      />
        {
          selectedDayReminders.length > 0 && (

            <ReminderList
              reminders={selectedDayReminders}
              onNew={handleNewReminder}

              onEdit={(reminder)=>{

                setEditingReminder(reminder);

                setSelectedDate(
                  new Date(reminder.date)
                );

              }}


              onDelete={(id)=>{

                deleteReminder(id);

                setSelectedDayReminders([]);

              }}

            />

          )
        }

      <Modal
        selectedDate={
          editingReminder
            ? new Date(editingReminder.date)
            : selectedDate
        }

        onClose={() => {
          setSelectedDate(null)
          setEditingReminder(null)
        }}

        onSave={
          editingReminder
            ? updateReminder
            : addReminder
        }

        selectedReminder={editingReminder}

        onDelete={deleteReminder}
      />
    </>
  );
}

export default App;