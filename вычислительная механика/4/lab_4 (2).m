clear all 
clc 
 
x1 = [0 1 0 0]; 
y1 = [0 0 1 0]; 
z1 = [0 0 0 1]; 
  
coord = zeros(4); 
coord(:, 1) = 1; 
coord(:, 2) = x1; 
coord(:, 3) = y1;
coord(:, 4) = z1; 
  
E = eye(4); 
coef = coord \ E; 
  
%A = inv(coord); 
syms P(x, y, z); 
P(x,y,z) = [1 x y z]; 
N = P * coef 
L = formula(N)
 
for i = [1:4]
    
N1 = subs(L(1,i)); 
%N1 = subs(L(1,1)); N2 = subs(L(1,2)); N3 = subs(L(1,3)); N4 = subs(L(1,4)); 
 
    C1 = [double(subs(N1, [x, y, z], [x1(2), y1(2), z1(2)])) 0; 
        double(subs(N1, [x, y, z], [x1(3), y1(3), z1(3)])) 0; 
        double(subs(N1, [x, y, z], [x1(4), y1(4), z1(4)])) 0]; 
     
    C2 = [double(subs(N1, [x, y, z], [x1(1), y1(1), z1(1)])) 0;       
        double(subs(N1, [x, y, z], [x1(2), y1(2), z1(2)])) 0;      
        double(subs(N1, [x, y, z], [x1(4), y1(4), z1(4)])) 0]; 
     
    C3 = [double(subs(N1, [x, y, z], [x1(1), y1(1), z1(1)])) 0;     
        double(subs(N1, [x, y, z], [x1(3), y1(3), z1(3)])) 0;      
        double(subs(N1, [x, y, z], [x1(4), y1(4), z1(4)])) 0]; 
     
    C4 = [double(subs(N1, [x, y, z], [x1(1), y1(1), z1(1)])) 0;      
        double(subs(N1, [x, y, z], [x1(2), y1(2), z1(2)])) 0;      
        double(subs(N1, [x, y, z], [x1(3), y1(3), z1(3)])) 0]; 
    
figure    
hold on
grid on
fill3([x1(2), 1; x1(3), 1; x1(4), 1], [y1(2), 1; y1(3), 1; y1(4), 1], [z1(2), 1; z1(3), 1; z1(4), 1], C1)    
fill3([x1(1), 1; x1(2), 1; x1(4), 1], [y1(1), 1; y1(2), 1; y1(4), 1], [z1(1), 1; z1(2), 1; z1(4), 1], C2) 
fill3([x1(1), 1; x1(3), 1; x1(4), 1], [y1(1), 1; y1(3), 1; y1(4), 1], [z1(1), 1; z1(3), 1; z1(4), 1], C3) 
fill3([x1(1), 1; x1(2), 1; x1(3), 1], [y1(1), 1; y1(2), 1; y1(3), 1], [z1(1), 1; z1(2), 1; z1(3), 1], C4)     
xlabel('Îñü X')    
ylabel('Îñü Y')   
zlabel('Îñü Z') 
end 
