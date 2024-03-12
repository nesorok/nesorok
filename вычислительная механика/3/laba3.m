clc;
clear all;

a = 0;
b = 1;
h = 0.2;
n = (b-a)/h;
x = linspace(a, b, n);
y = linspace(a, b, n);

U = zeros(n, n);

for i = 1:n
    U(i, 1) = 20.*sin(pi.*y(i));
    U(i, n) = 30.*x(i);
    U(1, i) = 30 * y(i);
    U(n, i) = 20.*x(i).*(1-x(i));
end

w = 0;
eps = 0.01;
U_k = zeros(n, n);
U_k = U;
U_k1 = zeros(n, n);
U_k1 = U;

w = 0;
W = zeros(1, 19);
iter = 0;
ITER = zeros(1, 19);

for k = 1:19
    w = k * 0.1;
    U_k = U;
    U_k1 = zeros(n, n);
    iter = 0;

    while norm(U_k1 - U_k) > eps
        iter = iter + 1;
        U_k1 = U_k;

        for i = 2:(n-1)
            for j = 2:(n-1)
                U_k(i, j) = U_k(i, j)*(1-w) + w*0.25*(U_k(i-1, j) + U_k(i+1, j) + U_k(i, j-1) + U_k(i, j+1));
            end
        end
    end

    ITER(1, k) = iter;
    W(1, k) = w;
    
    fprintf('w: %.1f, iterations: %d\n', w, iter);
end

w1 = 0.1;
iter = 0;
U_k = U;
U_k1 = zeros(n, n);

while norm(U_k1 - U_k) > eps
    iter = iter + 1;
    U_k1 = U_k;

    for i = 2:(n-1)
        for j = 2:(n-1)
            U_k(i, j) = U_k(i, j)*(1-w1) + w1*0.25*(U_k(i-1, j) + U_k(i+1, j) + U_k(i, j-1) + U_k(i, j+1));
        end
    end
end

fprintf('w: %.1f, iterations: %d\n', w1, iter);

surf(x, y, U_k);
title('График функции u(x,y)');
xlabel('x');
ylabel('y');
zlabel('u(x,y)');
colormap('cool')

figure;
plot(W, ITER, '-o');
xlabel('Значение w');
ylabel('Количество итераций');
title('График зависимости количества итераций от значений w');
grid on