<script>
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const items = document.querySelectorAll('.item');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');

    // 1. Fungsi Update Skala Tengah
    function updateActive() {
        const center = carousel.scrollLeft + (carousel.offsetWidth / 2);
        items.forEach(item => {
            const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
            if (Math.abs(center - itemCenter) < 150) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // 2. Navigasi Tombol (Menggunakan Event Listener agar tidak 403)
    btnPrev.addEventListener('click', () => {
        carousel.scrollBy({ left: -(items[0].offsetWidth + 30), behavior: 'smooth' });
    });

    btnNext.addEventListener('click', () => {
        carousel.scrollBy({ left: (items[0].offsetWidth + 30), behavior: 'smooth' });
    });

    // 3. Fitur Drag Mouse (Desktop)
    let isDown = false;
    let startX, scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseleave', () => { isDown = false; carousel.style.cursor = 'grab'; });
    carousel.addEventListener('mouseup', () => { isDown = false; carousel.style.cursor = 'grab'; });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.addEventListener('scroll', updateActive);
    window.addEventListener('resize', updateActive);
    updateActive();
});
</script>
