(function () {
    const canvas = document.getElementById("welcomeCanvas");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    let pointQuantity = 1000;
    if (window.innerWidth < 600) {
        pointQuantity = 400;
    }

    class Points {
        constructor(X, Y, r, color) {
            this.x = X;
            this.y = Y;
            this.radius = r;
            this.color = color;
        }

        drawPoint() {
            const random = Math.round(Math.random());
            const value = random === 1 ? true : false;
            ctx.beginPath();
            if (value) {
                const red = Math.round(Math.random() * 255);
                const green = Math.round(Math.random() * 255);
                const blue = Math.round(Math.random() * 255);
                this.color = `rgb(${red},${green},${blue})`;
            }
            const radius = Math.floor(Math.random() * 6);
            this.radius = radius;
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }

        positionPoint() {
            this.x = Math.floor(Math.random() * (canvas.width - 40)) + 20;
            this.y = Math.floor(Math.random() * (canvas.height - 40)) + 20;
        }
    }

    const createWindow = () => {
        for (let i = 0; i <= pointQuantity; i++) {
            const point = new Points(0, 0, 5, "white");
            point.positionPoint();
            point.drawPoint();
        }
    };

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createWindow();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
})();
