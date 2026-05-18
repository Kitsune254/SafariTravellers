const routePrices = {
    'Nairobi → Mombasa': 2800,
    'Nairobi → Kisumu': 2400,
    'Nairobi → Nakuru': 1600,
    'Mombasa → Nairobi': 2800,
    'Kisumu → Nairobi': 2400,
    'Nakuru → Nairobi': 1600,
};
const vipPremium = 600;
let selectedSeats = new Set();

function getTicketPrice(route) {
    return routePrices[route] || 0;
}

function updateCostDisplay() {
    const costDisplay = document.getElementById('costDisplay');
    const route = document.getElementById('route').value;
    if (!costDisplay || !route) {
        return;
    }

    const selectedEls = Array.from(document.querySelectorAll('.seat.selected'));
    if (selectedEls.length === 0) {
        costDisplay.style.display = 'none';
        return;
    }

    const basePrice = getTicketPrice(route);
    const vipCount = selectedEls.filter((el) => el.classList.contains('vip')).length;
    const standardCount = selectedEls.length - vipCount;
    const total = standardCount * basePrice + vipCount * (basePrice + vipPremium);
    const seatLabel = selectedEls.length === 1 ? '1 seat' : `${selectedEls.length} seats`;

    costDisplay.textContent = `Total: KES ${total.toLocaleString()} (${seatLabel}: ${standardCount} standard + ${vipCount} VIP)`;
    costDisplay.style.display = 'block';
}

function selectSeat(el) {
    if (el.classList.contains('taken')) return;

    const seat = el.dataset.seat;
    const info = document.getElementById('selectedSeatInfo');
    const confirmBtn = document.getElementById('confirmSeat');

    if (el.classList.contains('selected')) {
        el.classList.remove('selected');
        el.classList.add('available');
        selectedSeats.delete(seat);
    } else {
        el.classList.remove('available');
        el.classList.add('selected');
        selectedSeats.add(seat);
    }

    const sortedSeats = Array.from(selectedSeats).map(Number).sort((a, b) => a - b);
    if (sortedSeats.length === 0) {
        info.textContent = 'No seat selected';
        confirmBtn.disabled = true;
    } else {
        info.textContent = `Selected: Seat${sortedSeats.length > 1 ? 's' : ''} ${sortedSeats.join(', ')}`;
        confirmBtn.disabled = false;
    }
    updateCostDisplay();
}

function initializeBooking() {
    const routeEl = document.getElementById('route');
    const openSeatModal = document.getElementById('openSeatModal');
    const closeSeatModal = document.getElementById('closeSeatModal');
    const seatModal = document.getElementById('seatModal');
    const confirmSeat = document.getElementById('confirmSeat');
    const seatBtnText = document.getElementById('seatBtnText');
    const selectedSeatInput = document.getElementById('selected-seat');
    const bookingForm = document.getElementById('bookingForm');

    if (!routeEl || !openSeatModal || !closeSeatModal || !seatModal || !confirmSeat || !seatBtnText || !selectedSeatInput || !bookingForm) {
        return;
    }

    routeEl.addEventListener('change', updateCostDisplay);

    // Using class toggles to seamlessly coordinate with your custom style.css configurations
    openSeatModal.addEventListener('click', function () {
        seatModal.classList.add('open');
    });

    closeSeatModal.addEventListener('click', function () {
        seatModal.classList.remove('open');
    });

    seatModal.addEventListener('click', function (e) {
        if (e.target === this) {
            this.classList.remove('open');
        }
    });

    confirmSeat.addEventListener('click', function () {
        if (selectedSeats.size === 0) return;
        const sortedSeats = Array.from(selectedSeats).map(Number).sort((a, b) => a - b);
        selectedSeatInput.value = sortedSeats.join(',');
        seatBtnText.textContent = sortedSeats.length === 1
            ? `Seat ${sortedSeats[0]} selected`
            : `Seats ${sortedSeats.join(', ')} selected`;
        seatModal.classList.remove('open');
        updateCostDisplay();
    });

    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (selectedSeats.size === 0) {
            alert('Please select a bus seat before booking.');
            return;
        }
        const route = routeEl.value;
        const selectedEls = Array.from(document.querySelectorAll('.seat.selected'));
        const basePrice = getTicketPrice(route);
        const vipCount = selectedEls.filter((el) => el.classList.contains('vip')).length;
        const standardCount = selectedEls.length - vipCount;
        const total = standardCount * basePrice + vipCount * (basePrice + vipPremium);
        const sortedSeats = Array.from(selectedSeats).map(Number).sort((a, b) => a - b);
        
        alert(`Booking Confirmed!\nRoute: ${route}\nDate: ${document.getElementById('travel-date').value}\nTime: ${document.getElementById('departure-time').value}\nSeat(s): ${sortedSeats.join(', ')}\nTotal: KES ${total.toLocaleString()}`);
    });

    const dateInput = document.getElementById('travel-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

// 🟢 Turn the key in the ignition! This instructs the script to execute the moment the webpage loads.
document.addEventListener('DOMContentLoaded', initializeBooking);