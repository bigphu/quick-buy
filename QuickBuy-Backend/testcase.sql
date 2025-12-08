DROP DATABASE IF EXISTS QuickBuyDB;
CREATE DATABASE QuickBuyDB;
USE QuickBuyDB;


-------------------------------------   CREATE TABLE    -------------------------------------


-- =====================================
--          1. STORE TABLE
-- =====================================
CREATE TABLE Store (
    StoreID INT AUTO_INCREMENT PRIMARY KEY,
    Name    VARCHAR(100) NOT NULL,
    Street  VARCHAR(100) NOT NULL,
    City    VARCHAR(100) NOT NULL,
    Country VARCHAR(100) NOT NULL,

    CONSTRAINT chk_store_address_not_empty
        CHECK (
    CHAR_LENGTH(TRIM(Name))    > 0
    AND CHAR_LENGTH(TRIM(Street))  > 0
    AND CHAR_LENGTH(TRIM(City))    > 0
    AND CHAR_LENGTH(TRIM(Country)) > 0
)    
);


-- =====================================
--          2. WAREHOUSE TABLE
-- =====================================
CREATE TABLE Warehouse (
    WarehouseID INT AUTO_INCREMENT PRIMARY KEY,
    Name        VARCHAR(100) NOT NULL,
    Street      VARCHAR(100) NOT NULL,
    City        VARCHAR(100) NOT NULL,
    Country     VARCHAR(100) NOT NULL,

    CONSTRAINT chk_warehouse_address_not_empty
        CHECK (
    CHAR_LENGTH(TRIM(Name))    > 0
    AND CHAR_LENGTH(TRIM(Street))  > 0
    AND CHAR_LENGTH(TRIM(City))    > 0
    AND CHAR_LENGTH(TRIM(Country)) > 0
)
);


-- =====================================
--          3. CATEGORY TABLE
-- =====================================
CREATE TABLE Category (
    CategoryID   INT AUTO_INCREMENT PRIMARY KEY,
    CategoryName VARCHAR(255) NOT NULL,
    CategoryDesc  TEXT,
    ProductCount INT DEFAULT 0,
    CONSTRAINT chk_category_productcount_non_negative
        CHECK (ProductCount >= 0)
);


-- =====================================
--          4. PRODUCT TABLE
-- =====================================
CREATE TABLE Product (
    ProductID        INT AUTO_INCREMENT PRIMARY KEY,
    ProductName      VARCHAR(255) NOT NULL,
    ProductDesc      TEXT,
    ProductPrice     DECIMAL(10,2) NOT NULL,
    WholesaleCost     DECIMAL(10,2) NOT NULL,
    ManufacturingDate DATE,
    ExpiryDate        DATE,
    PictureUrl  VARCHAR(255) DEFAULT '',

    CONSTRAINT chk_product_price_positive
        CHECK (ProductPrice >= 0 AND WholesaleCost >= 0),
    CONSTRAINT chk_product_price_vs_cost
        CHECK (ProductPrice >= WholesaleCost),
    CONSTRAINT chk_product_expiry_after_mfg
        CHECK (ExpiryDate IS NULL
               OR ManufacturingDate IS NULL
               OR ExpiryDate >= ManufacturingDate)
);


-- =====================================
--       5. PICKUP TIMESLOT TABLE
-- =====================================
CREATE TABLE Pickup_Timeslot (
    SlotID INT AUTO_INCREMENT PRIMARY KEY,
    SlotDate DATE NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    Status VARCHAR(50) NOT NULL,
    MaxCapacity INT NOT NULL DEFAULT 10,
    CurrentBookings INT NOT NULL DEFAULT 0,
    CONSTRAINT CHK_Timeslot_Status CHECK (Status IN ('Available', 'Reserved', 'Full')),
    CONSTRAINT CHK_Timeslot_MaxCapacity CHECK (MaxCapacity > 0),
    CONSTRAINT CHK_Timeslot_CurrentBookings CHECK (CurrentBookings >= 0),
    CONSTRAINT CHK_Timeslot_TimeRange CHECK (EndTime > StartTime),
    CONSTRAINT CHK_Timeslot_Capacity CHECK (CurrentBookings <= MaxCapacity),
    CONSTRAINT UQ_Timeslot_DateTime UNIQUE (SlotDate, StartTime, EndTime)
);


-- =====================================
--          6. SUPPLIER TABLE
-- =====================================
CREATE TABLE Supplier (
    SupplierID   INT AUTO_INCREMENT PRIMARY KEY,
    SupplierName VARCHAR(255) NOT NULL,
    Email        VARCHAR(255),
    ContactInfo  VARCHAR(255),
    Street       VARCHAR(255) NOT NULL,
    City         VARCHAR(255) NOT NULL,
    Country      VARCHAR(255) NOT NULL,

    CONSTRAINT chk_supplier_address_not_empty
        CHECK (
    CHAR_LENGTH(TRIM(Street))  > 0
    AND CHAR_LENGTH(TRIM(City))    > 0
    AND CHAR_LENGTH(TRIM(Country)) > 0
            )
);


-- =====================================
--          7. ADMIN TABLE
-- =====================================
CREATE TABLE Admin (
    AdminID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50)  NOT NULL,
    LastName  VARCHAR(50)  NOT NULL,
    EncryptedPassword VARCHAR(255) NOT NULL,
    PhoneNumber     VARCHAR(20)  NOT NULL,
    Email     VARCHAR(100) NOT NULL UNIQUE,
    Street    VARCHAR(100) NOT NULL,
    City      VARCHAR(100) NOT NULL,
    Country   VARCHAR(100) NOT NULL,
    CONSTRAINT chk_admin_password_complexity
        CHECK (
            EncryptedPassword REGEXP
                '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$'
        ),
    CONSTRAINT chk_admin_address_not_empty
        CHECK (
            CHAR_LENGTH(TRIM(Street))  > 0
            AND CHAR_LENGTH(TRIM(City))    > 0
            AND CHAR_LENGTH(TRIM(Country)) > 0
        )
);


-- =====================================
--          8. CUSTOMER TABLE
-- =====================================
CREATE TABLE Customer (
    CustomerID     INT AUTO_INCREMENT PRIMARY KEY,
    LoyaltyPoints  INT DEFAULT 0,
    FirstName      VARCHAR(50)  NOT NULL,
    LastName       VARCHAR(50)  NOT NULL,
    EncryptedPassword VARCHAR(255) NOT NULL,
    PhoneNumber    VARCHAR(20)  NOT NULL,
    Email          VARCHAR(100) NOT NULL UNIQUE,
    Street         VARCHAR(100) NOT NULL,
    City           VARCHAR(100) NOT NULL,
    Country        VARCHAR(100) NOT NULL,
    CONSTRAINT chk_customer_loyalty_non_negative
        CHECK (LoyaltyPoints >= 0),
    CONSTRAINT chk_customer_password_complexity
        CHECK (
            EncryptedPassword REGEXP
                '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$'
        ),
    CONSTRAINT chk_customer_address_not_empty
        CHECK (
            CHAR_LENGTH(TRIM(Street))  > 0
            AND CHAR_LENGTH(TRIM(City))    > 0
            AND CHAR_LENGTH(TRIM(Country)) > 0
        )
);


-- =====================================
--          9. STAFF TABLE
-- =====================================
CREATE TABLE Staff (
    StaffID INT AUTO_INCREMENT PRIMARY KEY,
    StoreID INT NOT NULL,
    Position VARCHAR(50) NOT NULL,
    FirstName VARCHAR(50)  NOT NULL,
    LastName  VARCHAR(50)  NOT NULL,
    EncryptedPassword VARCHAR(255) NOT NULL,
    PhoneNumber     VARCHAR(20)  NOT NULL,
    Email     VARCHAR(100) NOT NULL UNIQUE,
    Street    VARCHAR(100) NOT NULL,
    City      VARCHAR(100) NOT NULL,
    Country   VARCHAR(100) NOT NULL,
    CONSTRAINT fk_staff_store
        FOREIGN KEY (StoreID) REFERENCES Store(StoreID),
    CONSTRAINT chk_staff_password_complexity
        CHECK (
            EncryptedPassword REGEXP
                '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$'
        ),
    CONSTRAINT chk_staff_address_not_empty
        CHECK (
            CHAR_LENGTH(TRIM(Street))  > 0
            AND CHAR_LENGTH(TRIM(City))    > 0
            AND CHAR_LENGTH(TRIM(Country)) > 0
        )
);


-- =====================================
--    10. ADMIN LOG TABLE
-- =====================================
CREATE TABLE Admin_Log (
    LogID INT AUTO_INCREMENT PRIMARY KEY,
    AdminID INT NOT NULL,
    StoreID INT NOT NULL,
    AdminAction VARCHAR(255) NOT NULL,
    ActionTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_actlog_admin FOREIGN KEY (AdminID) REFERENCES Admin(AdminID),
    CONSTRAINT fk_actlog_store FOREIGN KEY (StoreID) REFERENCES Store(StoreID)
);


-- =====================================
--         11. PRODUCT REVIEW TABLE
-- =====================================
CREATE TABLE Product_Review (
    ReviewID    INT AUTO_INCREMENT PRIMARY KEY,
    CustomerID  INT NOT NULL,
    ProductID   INT NOT NULL,
    Rating      INT NOT NULL,
    Content     TEXT,
    CreatedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_customer
        FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    CONSTRAINT fk_review_product
        FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    CONSTRAINT chk_rating_range
        CHECK (Rating BETWEEN 1 AND 5)
);


-- =====================================
--         12. BELONGS TO TABLE
-- =====================================
CREATE TABLE Belongs_To(
    ProductID  INT NOT NULL,
    CategoryID INT NOT NULL,
    PRIMARY KEY (ProductID, CategoryID),
    CONSTRAINT fk_prodcat_product
        FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    CONSTRAINT fk_prodcat_category
        FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
);


-- =====================================
--        13. SUBCATEGORY TABLE
-- =====================================
CREATE TABLE Subcategory (
  ChildCategoryID  INT PRIMARY KEY,      
  ParentCategoryID INT NOT NULL,        

  CONSTRAINT fk_subcategory_child
      FOREIGN KEY (ChildCategoryID) REFERENCES Category(CategoryID),

  CONSTRAINT fk_subcategory_parent
      FOREIGN KEY (ParentCategoryID) REFERENCES Category(CategoryID),

  CONSTRAINT chk_subcategory_not_self
      CHECK (ChildCategoryID <> ParentCategoryID)
);


-- =====================================
--          14. SUPPLIES TABLE
-- =====================================
CREATE TABLE Supplies (
    SupplierID INT NOT NULL,
    ProductID  INT NOT NULL,
    PRIMARY KEY (SupplierID, ProductID),
    CONSTRAINT fk_supplies_supplier
        FOREIGN KEY (SupplierID) REFERENCES Supplier(SupplierID),
    CONSTRAINT fk_supplies_product
        FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);


-- =====================================
--        15. HAS_PRODUCT TABLE
-- =====================================
CREATE TABLE Has_Product (
    StoreID   INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity  INT NOT NULL DEFAULT 0,
    PRIMARY KEY (StoreID, ProductID),
    CONSTRAINT fk_storeproduct_store
        FOREIGN KEY (StoreID) REFERENCES Store(StoreID),
    CONSTRAINT fk_storeproduct_product
        FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    CONSTRAINT chk_storeproduct_quantity_non_negative
        CHECK (Quantity >= 0)
);


-- =====================================
--       16. STORE_PRODUCT TABLE
-- =====================================
CREATE TABLE Store_Product (
    WarehouseID INT NOT NULL,
    ProductID   INT NOT NULL,
    Quantity    INT NOT NULL DEFAULT 0,
    PRIMARY KEY (WarehouseID, ProductID),
    CONSTRAINT fk_whproduct_warehouse
        FOREIGN KEY (WarehouseID) REFERENCES Warehouse(WarehouseID),
    CONSTRAINT fk_whproduct_product
        FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    CONSTRAINT chk_whproduct_quantity_non_negative
        CHECK (Quantity >= 0)
);


-- =====================================
--       17. SHOPPING_HISTORY TABLE
-- =====================================
CREATE TABLE Shopping_History (
    HistoryID    INT AUTO_INCREMENT PRIMARY KEY,
    CustomerID   INT NOT NULL,
    LastViewDate DATETIME NOT NULL,
    CONSTRAINT fk_history_customer
        FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);


-- =====================================
--          18. REFERS TO TABLE
-- =====================================
CREATE TABLE Refers_To (
    HistoryID   INT NOT NULL,
    ProductID   INT NOT NULL,
    PurchaseDate DATETIME NOT NULL,
    PRIMARY KEY (HistoryID, ProductID),
    CONSTRAINT fk_histprod_history
        FOREIGN KEY (HistoryID) REFERENCES Shopping_History(HistoryID),
    CONSTRAINT fk_histprod_product
        FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);


-- =====================================
--          19. WISH-LIST TABLE
-- =====================================
CREATE TABLE WishList (
    WishListID      INT AUTO_INCREMENT PRIMARY KEY,
    CustomerID      INT NOT NULL UNIQUE,
    LastUpdateDate  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_wishlist_customer
        FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);


-- =====================================
--   20. HAS WISH-LISTED PRODUCT TABLE
-- =====================================
CREATE TABLE Has_WishListed_Product (
    WishListID   INT NOT NULL,
    ProductID    INT NOT NULL,
    WishListDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (WishListID, ProductID),
    CONSTRAINT fk_wlp_wishlist
        FOREIGN KEY (WishListID) REFERENCES WishList(WishListID),
    CONSTRAINT fk_wlp_product
        FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);


-- =====================================
--        21. SHOPPING_CART TABLE
-- =====================================
CREATE TABLE Shopping_Cart (
    CartID INT AUTO_INCREMENT PRIMARY KEY,
    CustomerID INT NOT NULL,
    ItemCount INT NOT NULL DEFAULT 0,
    TotalPrice DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    CONSTRAINT FK_ShoppingCart_Customer
        FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    CONSTRAINT CHK_ShoppingCart_ItemCount CHECK (ItemCount >= 0),
    CONSTRAINT CHK_ShoppingCart_TotalPrice CHECK (TotalPrice >= 0),
    CONSTRAINT UQ_ShoppingCart_Customer UNIQUE (CustomerID)
);

-- =====================================
--          22. CART_ITEM TABLE
-- =====================================
CREATE TABLE Cart_Item (
    CartItemID INT AUTO_INCREMENT,
    CartID     INT NOT NULL,
    ProductID  INT NOT NULL,
    Quantity   INT NOT NULL,
    ItemPrice  DECIMAL(10,2) NOT NULL,
    AddedDate  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (CartItemID, CartID, ProductID),
    CONSTRAINT fk_cartitem_cart
        FOREIGN KEY (CartID) REFERENCES Shopping_Cart(CartID),
    CONSTRAINT fk_cartitem_product
        FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    CONSTRAINT chk_cartitem_quantity
        CHECK (Quantity > 0),
    CONSTRAINT chk_cartitem_itemprice
        CHECK (ItemPrice >= 0)
);

-------------------------------------   TRIGGER 2.2.2 – Shopping_Cart   -------------------------------------

DELIMITER $$

/* 1. BEFORE INSERT: tính ItemPrice cho Cart_Item */
CREATE TRIGGER before_CartItem_insert
BEFORE INSERT ON Cart_Item
FOR EACH ROW
BEGIN
    DECLARE v_price DECIMAL(10,2);

    SELECT ProductPrice INTO v_price
    FROM Product
    WHERE ProductID = NEW.ProductID;

    IF v_price IS NULL THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Product does not exist or has no price';
    END IF;

    SET NEW.ItemPrice = NEW.Quantity * v_price;
END$$

/* 2. BEFORE UPDATE: luôn tính lại ItemPrice nếu Quantity/Product đổi */
CREATE TRIGGER before_CartItem_update
BEFORE UPDATE ON Cart_Item
FOR EACH ROW
BEGIN
    DECLARE v_price DECIMAL(10,2);

    SELECT ProductPrice INTO v_price
    FROM Product
    WHERE ProductID = NEW.ProductID;

    IF v_price IS NULL THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Product does not exist or has no price';
    END IF;

    SET NEW.ItemPrice = NEW.Quantity * v_price;
END$$

/* 3. AFTER INSERT: cập nhật TotalPrice + ItemCount cho Shopping_Cart */

CREATE TRIGGER after_CartItem_insert
AFTER INSERT ON Cart_Item
FOR EACH ROW
BEGIN
    UPDATE Shopping_Cart sc
    SET 
        sc.TotalPrice = (
            SELECT IFNULL(SUM(ci.ItemPrice), 0)
            FROM Cart_Item ci
            WHERE ci.CartID = NEW.CartID
        ),
        sc.ItemCount = (
            SELECT IFNULL(COUNT(ci.CartItemID), 0)
            FROM Cart_Item ci
            WHERE ci.CartID = NEW.CartID
        )
    WHERE sc.CartID = NEW.CartID;
END$$

/* 4. AFTER UPDATE: cập nhật TotalPrice + ItemCount (khi Quantity/Product/CartID đổi) */
DELIMITER $$
CREATE TRIGGER after_CartItem_update
AFTER UPDATE ON Cart_Item
FOR EACH ROW
BEGIN
    -- Cập nhật giỏ cũ
    UPDATE Shopping_Cart sc
    SET 
        sc.TotalPrice = (
            SELECT IFNULL(SUM(ci.ItemPrice), 0)
            FROM Cart_Item ci
            WHERE ci.CartID = OLD.CartID
        ),
        sc.ItemCount = (
            SELECT IFNULL(COUNT(ci.CartItemID), 0)
            FROM Cart_Item ci 
            WHERE ci.CartID = OLD.CartID
        )
    WHERE sc.CartID = OLD.CartID;

    -- Nếu CartID thay đổi, cập nhật luôn giỏ mới
    IF NEW.CartID <> OLD.CartID THEN
        UPDATE Shopping_Cart sc
        SET 
            sc.TotalPrice = (
                SELECT IFNULL(SUM(ci.ItemPrice), 0)
                FROM Cart_Item ci
                WHERE ci.CartID = NEW.CartID
            ),
            sc.ItemCount = (
                SELECT IFNULL(COUNT(ci.CartItemID), 0)
                FROM Cart_Item ci 
                WHERE ci.CartID = NEW.CartID
            )
        WHERE sc.CartID = NEW.CartID;
    END IF;
END$$

/* 5. AFTER DELETE: cập nhật TotalPrice + ItemCount khi xóa Cart_Item */ 
CREATE TRIGGER after_CartItem_delete
AFTER DELETE ON Cart_Item
FOR EACH ROW
BEGIN
    UPDATE Shopping_Cart sc
    SET 
        sc.TotalPrice = (
            SELECT IFNULL(SUM(ci.ItemPrice), 0)
            FROM Cart_Item ci
            WHERE ci.CartID = OLD.CartID
        ),
        sc.ItemCount = (
            SELECT IFNULL(COUNT(ci.CartItemID), 0)
            FROM Cart_Item ci 
            WHERE ci.CartID = OLD.CartID
        )
    WHERE sc.CartID = OLD.CartID;
END$$

DELIMITER ;

-- =========================================================================
-- TEST CASES FOR CART ITEM TRIGGERS (Insert, Update, Delete)
-- =========================================================================

-- Setup Temporary Data for Testing
INSERT INTO Customer (FirstName, LastName, EncryptedPassword, PhoneNumber, Email, Street, City, Country) 
VALUES ('Test', 'User', 'Pass123!', '000', 'test@test.com', 'St', 'City', 'Country');
SET @TestCustID = LAST_INSERT_ID();

INSERT INTO Product (ProductName, ProductPrice, WholesaleCost, ManufacturingDate) 
VALUES ('TestProduct', 100.00, 50.00, '2024-01-01');
SET @TestProdID = LAST_INSERT_ID();

INSERT INTO Shopping_Cart (CustomerID) VALUES (@TestCustID);
SET @TestCartID = LAST_INSERT_ID();

-- TEST CASE 1: Insert item and verify ItemPrice calculation (Before Insert Trigger) 
-- and Shopping_Cart TotalPrice update (After Insert Trigger)
SELECT * FROM Shopping_Cart WHERE CartID = @TestCartID;
INSERT INTO Cart_Item (CartID, ProductID, Quantity) VALUES (@TestCartID, @TestProdID, 2);
SELECT * FROM Cart_Item WHERE CartID = @TestCartID; -- Expect ItemPrice = 200.00
SELECT * FROM Shopping_Cart WHERE CartID = @TestCartID; -- Expect TotalPrice = 200.00

-- TEST CASE 2: Update item quantity and verify recalculations (Update Triggers)
SELECT * FROM Cart_Item WHERE CartID = @TestCartID;
UPDATE Cart_Item SET Quantity = 5 WHERE CartID = @TestCartID AND ProductID = @TestProdID;
SELECT * FROM Cart_Item WHERE CartID = @TestCartID; -- Expect ItemPrice = 500.00
SELECT * FROM Shopping_Cart WHERE CartID = @TestCartID; -- Expect TotalPrice = 500.00

-- TEST CASE 3: Delete item and verify Shopping_Cart update (Delete Trigger)
DELETE FROM Cart_Item WHERE CartID = @TestCartID;
SELECT * FROM Shopping_Cart WHERE CartID = @TestCartID; -- Expect TotalPrice = 0.00

-- Cleanup
DELETE FROM Cart_Item WHERE CartID = @TestCartID;
DELETE FROM Shopping_Cart WHERE CartID = @TestCartID;
DELETE FROM Customer WHERE CustomerID = @TestCustID;
DELETE FROM Product WHERE ProductID = @TestProdID;


-- =====================================
--          23. ORDER TABLE
-- =====================================
CREATE TABLE `Order` (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    CustomerID INT NOT NULL,
    PickupSlotID INT,
    StoreID INT NOT NULL,
    OrderDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(50) NOT NULL,
    TotalPrice DECIMAL(10, 2) NOT NULL DEFAULT 0,
    CONSTRAINT CHK_Order_Status CHECK (
        Status IN ('Pending', 'Awaiting Picking', 'Ready for Pickup', 'Completed', 'Cancelled')
    ),
    CONSTRAINT CHK_Order_TotalPrice CHECK (TotalPrice >= 0),
    CONSTRAINT FK_Order_Customer FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    CONSTRAINT FK_Order_PickupSlot FOREIGN KEY (PickupSlotID) REFERENCES Pickup_Timeslot(SlotID),
    CONSTRAINT FK_Order_Store FOREIGN KEY (StoreID) REFERENCES Store(StoreID)

);


-- =====================================
--        24. ORDERED ITEM TABLE
-- =====================================
CREATE TABLE Ordered_Item (
    OrderedItemID INT AUTO_INCREMENT,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    ItemPrice DECIMAL(10, 2) NOT NULL DEFAULT 0,
    PRIMARY KEY(OrderedItemID, OrderID, ProductID),
    CONSTRAINT CHK_Ordered_Item_Quantity CHECK (Quantity > 0),
    CONSTRAINT CHK_Ordered_Item_ItemPrice CHECK (ItemPrice >= 0),
    CONSTRAINT FK_OrderedItem_Order FOREIGN KEY (OrderID) REFERENCES `Order`(OrderID),
    CONSTRAINT FK_OrderedItem_Product FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);


-- Trigger cho ORDERED_ITEM & ORDER
DELIMITER $$

/* =======================================================
   1. BEFORE INSERT: tính ItemPrice cho Ordered_Item
   ======================================================= */
CREATE TRIGGER before_OrderedItem_insert
BEFORE INSERT ON Ordered_Item
FOR EACH ROW
BEGIN
    DECLARE v_price DECIMAL(10,2);

    -- Lấy đơn giá của Product
    SELECT ProductPrice INTO v_price
    FROM Product
    WHERE ProductID = NEW.ProductID;

    IF v_price IS NULL THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Product does not exist or has no price';
    END IF;

    -- ItemPrice = Quantity * ProductPrice
    SET NEW.ItemPrice = NEW.Quantity * v_price;
END$$


/* =======================================================
   2. BEFORE UPDATE: luôn tính lại ItemPrice nếu Quantity/Product đổi
   ======================================================= */
CREATE TRIGGER before_OrderedItem_update
BEFORE UPDATE ON Ordered_Item
FOR EACH ROW
BEGIN
    DECLARE v_price DECIMAL(10,2);

    SELECT ProductPrice INTO v_price
    FROM Product
    WHERE ProductID = NEW.ProductID;

    IF v_price IS NULL THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Product does not exist or has no price';
    END IF;

    SET NEW.ItemPrice = NEW.Quantity * v_price;
END$$


/* =======================================================
   3. AFTER INSERT: cập nhật TotalPrice cho Order
   ======================================================= */
CREATE TRIGGER after_OrderedItem_insert
AFTER INSERT ON Ordered_Item
FOR EACH ROW
BEGIN
    UPDATE `Order` o
    SET o.TotalPrice = (
        SELECT IFNULL(SUM(oi.ItemPrice), 0)
        FROM Ordered_Item oi
        WHERE oi.OrderID = NEW.OrderID
    )
    WHERE o.OrderID = NEW.OrderID;
END$$


/* =======================================================
   4. AFTER UPDATE: cập nhật TotalPrice (trường hợp Quantity/Product/OrderID đổi)
   ======================================================= */
CREATE TRIGGER after_OrderedItem_update
AFTER UPDATE ON Ordered_Item
FOR EACH ROW
BEGIN
    -- Cập nhật order cũ (phòng trường hợp OrderID bị đổi)
    UPDATE `Order` o
    SET o.TotalPrice = (
        SELECT IFNULL(SUM(oi.ItemPrice), 0)
        FROM Ordered_Item oi
        WHERE oi.OrderID = OLD.OrderID
    )
    WHERE o.OrderID = OLD.OrderID;

    -- Nếu OrderID thay đổi, cập nhật luôn order mới
    IF NEW.OrderID <> OLD.OrderID THEN
        UPDATE `Order` o
        SET o.TotalPrice = (
            SELECT IFNULL(SUM(oi.ItemPrice), 0)
            FROM Ordered_Item oi
            WHERE oi.OrderID = NEW.OrderID
        )
        WHERE o.OrderID = NEW.OrderID;
    END IF;
END$$


/* =======================================================
   5. AFTER DELETE: cập nhật TotalPrice khi xóa Ordered_Item
   ======================================================= */
CREATE TRIGGER after_OrderedItem_delete
AFTER DELETE ON Ordered_Item
FOR EACH ROW
BEGIN
    UPDATE `Order` o
    SET o.TotalPrice = (
        SELECT IFNULL(SUM(oi.ItemPrice), 0)
        FROM Ordered_Item oi
        WHERE oi.OrderID = OLD.OrderID
    )
    WHERE o.OrderID = OLD.OrderID;
END$$

DELIMITER ;

-- =========================================================================
-- TEST CASES FOR ORDERED ITEM TRIGGERS
-- =========================================================================

-- Setup Temporary Data
INSERT INTO Store (Name, Street, City, Country) VALUES ('TStore', 'St', 'C', 'Co');
SET @TStoreID = LAST_INSERT_ID();
INSERT INTO Customer (FirstName, LastName, EncryptedPassword, PhoneNumber, Email, Street, City, Country) 
VALUES ('T', 'U', 'P!1111aaaaa', '1', 't2@t.com', 'S', 'C', 'Co');
SET @TCustID = LAST_INSERT_ID();
INSERT INTO Product (ProductName, ProductPrice, WholesaleCost) VALUES ('P1', 50.00, 20.00);
SET @TProdID = LAST_INSERT_ID();
INSERT INTO `Order` (CustomerID, StoreID, Status) VALUES (@TCustID, @TStoreID, 'Pending');
SET @TOrderID = LAST_INSERT_ID();

-- TEST CASE 1: Insert Ordered Item and check auto-calculation of Price and Order Total
SELECT * FROM `Order` WHERE OrderID = @TOrderID;
INSERT INTO Ordered_Item (OrderID, ProductID, Quantity) VALUES (@TOrderID, @TProdID, 3);
SELECT * FROM Ordered_Item WHERE OrderID = @TOrderID; -- Expect ItemPrice = 150.00
SELECT * FROM `Order` WHERE OrderID = @TOrderID; -- Expect TotalPrice = 150.00

-- TEST CASE 2: Update Ordered Item and check recalculation
UPDATE Ordered_Item SET Quantity = 4 WHERE OrderID = @TOrderID AND ProductID = @TProdID;
SELECT * FROM Ordered_Item WHERE OrderID = @TOrderID; -- Expect ItemPrice = 200.00
SELECT * FROM `Order` WHERE OrderID = @TOrderID; -- Expect TotalPrice = 200.00

-- Cleanup
DELETE FROM Ordered_Item WHERE OrderID = @TOrderID;
DELETE FROM `Order` WHERE OrderID = @TOrderID;
DELETE FROM Product WHERE ProductID = @TProdID;
DELETE FROM Customer WHERE CustomerID = @TCustID;
DELETE FROM Store WHERE StoreID = @TStoreID;


-- =====================================
--          25. PAYMENT TABLE
-- =====================================
CREATE TABLE Payment (
    PaymentID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT NOT NULL UNIQUE,
    PaymentMethod VARCHAR(50) NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    Date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    CONSTRAINT CHK_Payment_Method CHECK (PaymentMethod IN ('Credit Card', 'Debit Card', 'Cash', 'E-Wallet', 'Bank Transfer')),
    CONSTRAINT CHK_Payment_Amount CHECK (Amount >= 0),
    CONSTRAINT CHK_Payment_Status CHECK (Status IN ('Pending', 'Completed', 'Failed', 'Refunded')),
    CONSTRAINT FK_Payment_Order FOREIGN KEY (OrderID) REFERENCES `Order`(OrderID) 
);


-- =====================================
--        26. HANDLES ORDER TABLE
-- =====================================
CREATE TABLE Handles_Order (
    StaffID INT NOT NULL,
    OrderID INT NOT NULL,
    PRIMARY KEY (StaffID, OrderID),
    CONSTRAINT FK_HandlesOrder_Staff FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
    CONSTRAINT FK_HandlesOrder_Order FOREIGN KEY (OrderID) REFERENCES `Order`(OrderID) 
);


-- =====================================
--          27. COUPON TABLE
-- =====================================
CREATE TABLE Coupon (
    CouponID            INT AUTO_INCREMENT PRIMARY KEY,
    Name                VARCHAR(100) NOT NULL,
    Description         TEXT,
    DiscountValue       DECIMAL(10,2) NOT NULL,
    CouponAmount        INT NOT NULL DEFAULT 0,      
    MinimumPriceRequired DECIMAL(10,2) NOT NULL DEFAULT 0,
    CreatedDate         DATE NOT NULL,
    ExpiryDate          DATE NOT NULL,
    StoreID             INT,
    CustomerID          INT,
    OrderID             INT,
    CONSTRAINT fk_coupon_store
        FOREIGN KEY (StoreID) REFERENCES Store(StoreID),
    CONSTRAINT fk_coupon_customer
        FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    CONSTRAINT fk_coupon_order
        FOREIGN KEY (OrderID) REFERENCES `Order`(OrderID),
    CONSTRAINT chk_coupon_discount_non_negative
        CHECK (DiscountValue >= 0),
    CONSTRAINT chk_coupon_min_price_non_negative
        CHECK (MinimumPriceRequired >= 0),
    CONSTRAINT chk_coupon_date_range
        CHECK (CreatedDate <= ExpiryDate),
    CONSTRAINT chk_coupon_amount_non_negative
        CHECK (CouponAmount >= 0)
);


-- =====================================
--     28. IS APPLICABLE FOR TABLE
-- =====================================
CREATE TABLE Is_Applicable_For (
    CouponID  INT NOT NULL,
    ProductID INT NOT NULL,
    PRIMARY KEY (CouponID, ProductID),
    CONSTRAINT fk_cap_coupon
        FOREIGN KEY (CouponID) REFERENCES Coupon(CouponID),
    CONSTRAINT fk_cap_product
        FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);


-- =====================================
--          29. LINKS TO TABLE
-- =====================================
CREATE TABLE Links_To (
    StoreID     INT NOT NULL,
    WarehouseID INT NOT NULL,
    PRIMARY KEY (StoreID, WarehouseID),
    CONSTRAINT fk_link_store
        FOREIGN KEY (StoreID) REFERENCES Store(StoreID),
    CONSTRAINT fk_link_warehouse
        FOREIGN KEY (WarehouseID) REFERENCES Warehouse(WarehouseID)
);




-- -----------------------------------   Trigger for Semantic Constraint    -------------------------------------


-- ==========================================================================
--                                         6th & 12th SC 
-- ==========================================================================

DELIMITER $$

CREATE TRIGGER before_Order_update_all
BEFORE UPDATE ON `Order`
FOR EACH ROW
BEGIN
    DECLARE v_hours_diff INT;
    DECLARE v_paid_count INT DEFAULT 0;
    DECLARE v_missing INT;

    -- ===================================================================
    --             6th SC: Auto-cancel nếu > 24h chưa thanh toán
    -- ===================================================================
    SET v_hours_diff = TIMESTAMPDIFF(HOUR, OLD.OrderDate, NOW());

    SELECT COUNT(*) INTO v_paid_count
    FROM Payment p
    WHERE p.OrderID = OLD.OrderID
      AND p.Status = 'Completed';

    IF v_hours_diff >= 24
       AND v_paid_count = 0
       AND OLD.Status NOT IN ('Completed', 'Cancelled') THEN
        SET NEW.Status = 'Cancelled';
    END IF;

    -- ===================================================================
    --                      12th SC: Store phải đủ stock
    -- ===================================================================
    IF (NEW.StoreID <> OLD.StoreID
        OR NEW.Status <> OLD.Status)
       AND NEW.Status IN ('Awaiting Picking', 'Ready for Pickup', 'Completed') THEN

        SELECT COUNT(*) INTO v_missing
        FROM Ordered_Item oi
        LEFT JOIN Has_Product hp
               ON hp.ProductID = oi.ProductID
              AND hp.StoreID   = NEW.StoreID
        WHERE oi.OrderID = NEW.OrderID
          AND (hp.StoreID IS NULL OR hp.Quantity < oi.Quantity);

        IF v_missing > 0 THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Store does not have enough stock for this order';
        END IF;
    END IF;
END$$

DELIMITER ;

-- =========================================================================
-- TEST CASES FOR SEMANTIC CONSTRAINT TRIGGER
-- =========================================================================

-- Setup Temporary Data
INSERT INTO Store (Name, Street, City, Country) VALUES ('S1', 'Str', 'Ci', 'Co');
SET @S1 = LAST_INSERT_ID();
INSERT INTO Store (Name, Street, City, Country) VALUES ('S2', 'Str', 'Ci', 'Co');
SET @S2 = LAST_INSERT_ID();
INSERT INTO Customer (FirstName, LastName, EncryptedPassword, PhoneNumber, Email, Street, City, Country) VALUES ('A','B','P@SSw0rD','1','e@e.com','s','c','c');
SET @C1 = LAST_INSERT_ID();
INSERT INTO Product (ProductName, ProductPrice, WholesaleCost) VALUES ('P1', 10, 5);
SET @P1 = LAST_INSERT_ID();
-- Has_Product: Store has 10 and 0 quantity
INSERT INTO Has_Product (StoreID, ProductID, Quantity) VALUES (@S1, @P1, 10); 
INSERT INTO Has_Product (StoreID, ProductID, Quantity) VALUES (@S2, @P1, 0); 

INSERT INTO `Order` (CustomerID, StoreID, Status, OrderDate) VALUES (@C1, @S1, 'Pending', NOW());
SET @O1 = LAST_INSERT_ID();

INSERT INTO Ordered_Item (OrderID, ProductID, Quantity) VALUES (@O1, @P1, 5);

UPDATE `Order` 
SET 
    StoreID = @S2,
    Status = 'Completed'
WHERE OrderID = @O1;

-- TEST CASE 1: Attempt to change status to 'Ready for Pickup' without stock (Should Fail)
-- Note: This is a failure test. 
-- Triggers Error 45000 because store S2 doesn't have enough stock to serve order O1

-- TEST CASE 2: Auto-cancel old unpaid order
-- We simulate an old order date
UPDATE `Order` SET OrderDate = DATE_SUB(NOW(), INTERVAL 25 HOUR) WHERE OrderID = @O1;
SELECT Status FROM `Order` WHERE OrderID = @O1; -- Before: Pending
UPDATE `Order` SET StoreID = @S1 WHERE OrderID = @O1; -- Trigger Update to fire logic
SELECT Status FROM `Order` WHERE OrderID = @O1; -- After: Cancelled (because >24h and no payment)

-- Cleanup
DELETE FROM Ordered_Item WHERE OrderID = @O1;
DELETE FROM `Order` WHERE OrderID = @O1;
DELETE FROM Has_Product WHERE StoreID = @S1;
DELETE FROM Has_Product WHERE StoreID = @S2;
DELETE FROM Product WHERE ProductID = @P1;
DELETE FROM Customer WHERE CustomerID = @C1;
DELETE FROM Store WHERE StoreID = @S1;


-- -----------------------------------   INSERT DATA    -------------------------------------


-- =====================================
-- 1. STORE TABLE (10 rows)
-- =====================================
INSERT INTO Store (Name, Street, City, Country) VALUES
('QuickBuy HCM District 1',  '12 Nguyen Hue',        'Ho Chi Minh', 'Vietnam'),
('QuickBuy HCM Go Vap',      '200 Quang Trung',      'Ho Chi Minh', 'Vietnam'),
('QuickBuy Ha Noi Ba Dinh',  '15 Kim Ma',            'Ha Noi',      'Vietnam'),
('QuickBuy Ha Noi Cau Giay','88 Tran Thai Tong',     'Ha Noi',      'Vietnam'),
('QuickBuy Da Nang Center',  '60 Nguyen Van Linh',   'Da Nang',     'Vietnam'),
('QuickBuy Can Tho Ninh Kieu','40 3/2',              'Can Tho',     'Vietnam'),
('QuickBuy Hai Phong Center','33 Le Loi',            'Hai Phong',   'Vietnam'),
('QuickBuy Nha Trang Beach', '70 Tran Phu',          'Nha Trang',   'Vietnam'),
('QuickBuy Vung Tau',        '25 Thuy Van',          'Vung Tau',    'Vietnam'),
('QuickBuy Da Lat Market',   '99 Phan Dinh Phung',   'Da Lat',      'Vietnam');


-- =====================================
-- 2. WAREHOUSE TABLE (10 rows)
-- =====================================
INSERT INTO Warehouse (Name, Street, City, Country) VALUES
('HCM Main Warehouse',      '500 Nguyen Van Linh',   'Ho Chi Minh', 'Vietnam'),
('HCM Backup Warehouse',    '600 Vo Van Kiet',       'Ho Chi Minh', 'Vietnam'),
('Ha Noi North Warehouse',  '100 Pham Van Dong',     'Ha Noi',      'Vietnam'),
('Ha Noi South Warehouse',  '120 Giai Phong',        'Ha Noi',      'Vietnam'),
('Da Nang Warehouse',       '50 Nguyen Tat Thanh',   'Da Nang',     'Vietnam'),
('Can Tho Warehouse',       '150 30/4',              'Can Tho',     'Vietnam'),
('Hai Phong Warehouse',     '80 Nguyen Binh Khiem',  'Hai Phong',   'Vietnam'),
('Nha Trang Warehouse',     '200 23/10',             'Nha Trang',   'Vietnam'),
('Vung Tau Warehouse',      '60 Truong Cong Dinh',   'Vung Tau',    'Vietnam'),
('Da Lat Warehouse',        '30 Ho Tung Mau',        'Da Lat',      'Vietnam');


-- =====================================
-- 3. CATEGORY TABLE (10 rows)
-- =====================================
INSERT INTO Category (CategoryName, CategoryDesc, ProductCount) VALUES
('Electronics',    'Electronic devices and accessories', 0),
('Smartphones',    'Mobile phones and accessories',      2),
('Laptops',        'Personal and work laptops',          2),
('Home Appliances','Home and kitchen appliances',        2),
('Grocery',        'Daily grocery items',                2),
('Beverage',       'Drinks and beverages',               1),
('Personal Care',  'Health and personal care products',  1),
('Fashion',        'Clothes and fashion items',          0),
('Sports',         'Sports equipment',                   0),
('Toys',           'Toys and kids items',                0);

-- =====================================
-- 4. PRODUCT TABLE (10 rows)
-- =====================================
INSERT INTO Product (ProductName, ProductDesc, ProductPrice, WholesaleCost, ManufacturingDate, ExpiryDate, PictureUrl) VALUES
('iPhone 15',          'Apple smartphone 128GB',             1000, 840, '2024-01-01', NULL, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/wysiwyg/Phone/Apple/iphone_15/dien-thoai-iphone-15-256gb-8.jpg'),
('Samsung Galaxy S24', 'Samsung smartphone 256GB',           880, 740, '2024-02-01', NULL, 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-s24-plus-tim.png'),
('Dell Inspiron 15',   'Dell laptop 15 inch',                720, 600, '2023-11-15', NULL, 'https://product.hstatic.net/200000710483/product/611nhsehs5l._ac_sx679__cbea54784c0e4bf78b8fdf17398f4394_1024x1024.jpg'),
('MacBook Air M2',     'Apple MacBook Air M2 256GB',         1280, 1120, '2024-03-10', NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSnQPhUHmJeRf6fiNtUvMdDED2rZBuLhn2ZA&s'),
('Panasonic Rice Cooker','1.8L rice cooker',                 60,  48,  '2024-04-01', NULL, 'https://wafuu.com/cdn/shop/products/panasonic-rice-cooker-for-overseas-220v-sr-thb185w-made-in-japan-480593.jpg?v=1695256204'),
('Sharp Fridge 300L',  '300L refrigerator',                  360,  312,  '2024-03-20', NULL, 'https://sg.sharp/sites/default/files/styles/resize_640x640/public/2023-05/Open-Empty-Fridge_RF30-RF33.jpg?itok=5Rp1lb9c'),
('Gao ST25 5kg',       'Vietnamese ST25 rice 5kg',           10,   8,   '2024-05-01', '2025-05-01', 'https://gaost.vn/wp-content/uploads/2020/12/gao-st25-ong-cua-tui-5kg-mau-moi-2023.webp'),
('Trung Vit Lon Pack', 'Pack of preserved eggs',             3.2,    2.4,    '2024-06-01', '2025-06-01', 'https://vietnam-mart.com/wp-content/uploads/2022/10/a145_1.jpg'),
('Tra Xanh Khong Do',  'Green tea drink 24 cans',            7.2,   5.6,   '2024-04-15', '2025-04-15', 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8938/85739/bhx/fgjiol_202410140914265805.jpg'),
('Shampoo Dohas_productve 650ml', 'Hair shampoo 650ml',      6,   4.4,   '2024-05-10', '2026-05-10', 'https://img.cdnx.in/219726/1700645194943_29580111dovehairfallrescueshampoo.jpeg?format=webp');


-- =====================================
-- 5. PICKUP TIMESLOT TABLE (10 rows)
-- =====================================
INSERT INTO Pickup_Timeslot (SlotDate, StartTime, EndTime, Status, MaxCapacity, CurrentBookings) VALUES
('2025-11-26', '08:00:00', '09:00:00', 'Available', 10, 2),
('2025-11-26', '09:00:00', '10:00:00', 'Available', 10, 5),
('2025-11-26', '10:00:00', '11:00:00', 'Reserved',  10, 8),
('2025-11-26', '11:00:00', '12:00:00', 'Full',      10, 10),
('2025-11-26', '13:00:00', '14:00:00', 'Available', 8,  3),
('2025-11-26', '14:00:00', '15:00:00', 'Reserved',  8,  7),
('2025-11-27', '08:00:00', '09:00:00', 'Available', 12, 4),
('2025-11-27', '09:00:00', '10:00:00', 'Available', 12, 6),
('2025-11-27', '10:00:00', '11:00:00', 'Reserved',  12, 11),
('2025-11-27', '11:00:00', '12:00:00', 'Available', 12, 0);


-- =====================================
-- 6. SUPPLIER TABLE (10 rows)  
-- =====================================
INSERT INTO Supplier (SupplierName, Email, ContactInfo, Street, City, Country) VALUES
('VietElectro JSC',    'contact@vietelectro.vn', '028-39390001', '123 Cach Mang Thang 8',  'Ho Chi Minh', 'Vietnam'),
('SaiGon Mobile Co',   'sales@saigonmobile.vn',  '028-39390002', '45 Nguyen Dinh Chieu',   'Ho Chi Minh', 'Vietnam'),
('Ha Noi Laptop Co',   'info@hanoilaptop.vn',    '024-37770001', '20 Lang Ha',             'Ha Noi',      'Vietnam'),
('Gia Dung Viet',      'support@giadungviet.vn', '024-35550001', '88 Giai Phong',          'Ha Noi',      'Vietnam'),
('Gao Sach Mekong',    'cs@gaosachmekong.vn',    '0292-38380001','50 3/2',                 'Can Tho',     'Vietnam'),
('Thuc Pham Trung Nam','info@trungnamfood.vn',   '0236-36660001','66 Nguyen Van Linh',     'Da Nang',     'Vietnam'),
('Do Uong Viet Co',    'sales@douongviet.vn',    '028-39390003', '90 Nguyen Thi Minh Khai','Ho Chi Minh', 'Vietnam'),
('My Pham Sai Gon',    'info@myphamsaigon.vn',   '028-39390004', '11 Ly Tu Trong',         'Ho Chi Minh', 'Vietnam'),
('Thoi Trang Viet',    'contact@thoitrangviet.vn','024-32220001','5 Phan Boi Chau',        'Ha Noi',      'Vietnam'),
('The Thao Bien Hoa',  'info@thethaobh.vn',      '0251-38280001','12 Vo Thi Sau',          'Bien Hoa',    'Vietnam');


-- =====================================
-- 7. ADMIN TABLE (10 rows)  
-- =====================================
INSERT INTO Admin (
    FirstName, LastName, EncryptedPassword, PhoneNumber, Email, Street, City, Country) VALUES
('Minh',   'Nguyen', 'Abc12345!', '0901000001', 'admin1@quickbuy.vn',
 '12 Nguyen Hue',        'Ho Chi Minh', 'Vietnam'),
('Lan',    'Tran',   'Abc12345!', '0901000002', 'admin2@quickbuy.vn',
 '45 Le Loi',            'Ho Chi Minh', 'Vietnam'),
('Hai',    'Le',     'Abc12345!', '0901000003', 'admin3@quickbuy.vn',
 '20 Nguyen Trai',       'Ha Noi',      'Vietnam'),
('Hieu',   'Pham',   'Abc12345!', '0901000004', 'admin4@quickbuy.vn',
 '88 Bach Dang',         'Da Nang',     'Vietnam'),
('Thu',    'Vo',     'Abc12345!', '0901000005', 'admin5@quickbuy.vn',
 '10 Tran Hung Dao',     'Hue',         'Vietnam'),
('Khanh',  'Hoang',  'Abc12345!', '0901000006', 'admin6@quickbuy.vn',
 '25 Quang Trung',       'Can Tho',     'Vietnam'),
('Tuan',   'Bui',    'Abc12345!', '0901000007', 'admin7@quickbuy.vn',
 '35 Ly Thuong Kiet',    'Da Nang',     'Vietnam'),
('Nga',    'Dang',   'Abc12345!', '0901000008', 'admin8@quickbuy.vn',
 '50 Ngo Quyen',         'Hai Phong',   'Vietnam'),
('Phong',  'Do',     'Abc12345!', '0901000009', 'admin9@quickbuy.vn',
 '70 Tran Phu',          'Nha Trang',   'Vietnam'),
('My',     'Pham',   'Abc12345!', '0901000010', 'admin10@quickbuy.vn',
 '99 Phan Chu Trinh',    'Da Lat',      'Vietnam');


-- =====================================
-- 8. CUSTOMER TABLE (10 rows)  
-- =====================================
INSERT INTO Customer (
    LoyaltyPoints, FirstName, LastName, EncryptedPassword, PhoneNumber, Email, Street, City, Country) VALUES
(120, 'Anh',  'Nguyen', 'Abc12345!', '0901000021', 'cust1@quickbuy.vn',
  '1 Le Loi',        'Ho Chi Minh', 'Vietnam'),
(80, 'Chi',  'Tran',   'Abc12345!', '0901000022', 'cust2@quickbuy.vn',
  '2 Le Loi',        'Ho Chi Minh', 'Vietnam'),
(150, 'Yen',  'Le',     'Abc12345!', '0901000023', 'cust3@quickbuy.vn',
  '3 Tran Phu',      'Ha Noi',      'Vietnam'),
(0, 'Hoa',  'Vo',     'Abc12345!', '0901000024', 'cust4@quickbuy.vn',
  '4 Tran Phu',      'Ha Noi',      'Vietnam'),
(60, 'Nhi',  'Dang',   'Abc12345!', '0901000025', 'cust5@quickbuy.vn',
  '5 Nguyen Hue',    'Da Nang',     'Vietnam'),
(40, 'Long', 'Bui',    'Abc12345!', '0901000026', 'cust6@quickbuy.vn',
  '6 Nguyen Hue',    'Hue',         'Vietnam'),
(200, 'Tien', 'Do',     'Abc12345!', '0901000027', 'cust7@quickbuy.vn',
  '7 Hai Ba Trung',  'Can Tho',     'Vietnam'),
(30, 'Phuc', 'Hoang',  'Abc12345!', '0901000028', 'cust8@quickbuy.vn',
  '8 Hai Ba Trung',  'Hai Phong',   'Vietnam'),
(75, 'Huy',  'Tran',   'Abc12345!', '0901000029', 'cust9@quickbuy.vn',
  '9 Nguyen Trai',   'Nha Trang',   'Vietnam'),
(50, 'Tram', 'Nguyen', 'Abc12345!', '0901000030', 'cust10@quickbuy.vn',
  '10 Nguyen Trai',  'Da Lat',      'Vietnam');


-- =====================================
-- 9. STAFF TABLE (10 rows)  
-- =====================================
INSERT INTO Staff (
    StoreID, Position, FirstName, LastName, EncryptedPassword, PhoneNumber, Email, Street, City, Country) VALUES
(1, 'Store Manager', 'Quang', 'Nguyen', 'Abc12345!', '0901000011',
 'staff1@quickbuy.vn', '101 Dien Bien Phu',    'Ho Chi Minh', 'Vietnam'),
(1, 'Cashier',       'Trang', 'Le',      'Abc12345!', '0901000012',
 'staff2@quickbuy.vn', '55 Cach Mang Thang 8','Ho Chi Minh', 'Vietnam'),
(1, 'Picker',        'Dat',   'Vo',      'Abc12345!', '0901000013',
 'staff3@quickbuy.vn', '15 Kim Ma',           'Ha Noi',      'Vietnam'),
(1, 'Store Manager', 'Hanh',  'Phan',    'Abc12345!', '0901000014',
 'staff4@quickbuy.vn', '60 Nguyen Chi Thanh', 'Ha Noi',      'Vietnam'),
(1, 'Picker',        'Son',   'Tran',    'Abc12345!', '0901000015',
 'staff5@quickbuy.vn', '22 Le Duan',          'Da Nang',     'Vietnam'),
(5, 'Store Manager', 'Linh',  'Ho',      'Abc12345!', '0901000016',
 'staff6@quickbuy.vn', '18 Hung Vuong',       'Hue',         'Vietnam'),
(6, 'Cashier',       'Vy',    'Nguyen',  'Abc12345!', '0901000017',
 'staff7@quickbuy.vn', '40 3/2',             'Can Tho',     'Vietnam'),
(7, 'Picker',        'An',    'Bui',     'Abc12345!', '0901000018',
 'staff8@quickbuy.vn', '33 Hai Ba Trung',     'Hai Phong',   'Vietnam'),
(8, 'Store Manager', 'Thao',  'Do',      'Abc12345!', '0901000019',
 'staff9@quickbuy.vn', '27 Tran Hung Dao',    'Nha Trang',   'Vietnam'),
(9, 'Picker',        'Khoa',  'Pham',    'Abc12345!', '0901000020',
 'staff10@quickbuy.vn','12 Nguyen Van Cu',    'Da Lat',      'Vietnam');



-- =====================================
-- 10. ADMIN LOG TABLE (10 rows)  
-- =====================================
 INSERT INTO Admin_Log (AdminID, StoreID, AdminAction, ActionTime) VALUES
(1, 1, 'Created initial store configuration for QuickBuy HCM District 1',  '2025-11-20 08:30:00'),
(2, 1, 'Updated product price for iPhone 15',                              '2025-11-20 09:15:00'),
(3, 1, 'Approved new laptop product Dell Inspiron 15',                     '2025-11-21 10:00:00'),
(4, 4, 'Configured pickup timeslot for store Ha Noi Cau Giay',             '2025-11-21 11:45:00'),
(5, 1, 'Reviewed and published customer review for Panasonic Rice Cooker', '2025-11-22 09:10:00'),
(6, 6, 'Updated store inventory for Gao ST25 5kg',                          '2025-11-22 16:20:00'),
(7, 7, 'Activated promotion coupon WELCOME10 at Hai Phong Center',         '2025-11-23 10:05:00'),
(8, 8, 'Deactivated out-of-stock product Sharp Fridge 300L',               '2025-11-23 18:40:00'),
(9, 8, 'Checked fraud risk for order #9 at QuickBuy Nha Trang Beach',      '2025-11-24 13:20:00'),
(10,10,'Generated daily sales report for Da Lat Market',                   '2025-11-24 21:45:00');


-- =====================================
-- 11. PRODUCT_REVIEW TABLE (10 rows)
-- =====================================
INSERT INTO Product_Review (CustomerID, ProductID, Rating, Content, CreatedDate) VALUES
(1,  1, 5, 'San pham rat tot, giao nhanh tai HCM.','2025-11-27 09:00:00'),
(2,  2, 4, 'May chay muot, pin on.',               '2025-11-27 10:00:00'),
(3,  3, 5, 'Laptop phu hop cho cong viec.',        '2025-11-28 11:00:00'),
(4,  5, 4, 'Noi com nho gon, de dung.',            '2025-11-28 12:00:00'),
(5,  7, 5, 'Gao ngon, hat dai, de nau.',           '2025-11-26 17:00:00'),
(6,  8, 3, 'Chat luong tam on.',                   '2025-11-26 15:00:00'),
(7,  9, 4, 'Tra uong mat, gia hop ly.',            '2025-11-29 09:00:00'),
(8, 10, 4, 'Dau goi mui de chiu.',                 '2025-11-30 10:00:00'),
(9,  1, 5, 'iPhone 15 chup anh rat dep.',          '2025-11-27 11:30:00'),
(10, 4, 5, 'MacBook Air M2 rat nhe.',              '2025-11-27 11:30:00');


-- =====================================
-- 12. BELONGS_TO TABLE (10 rows)
-- =====================================
INSERT INTO Belongs_To (ProductID, CategoryID) VALUES
(1, 2),  -- iPhone -> Smartphones
(2, 2),  -- Samsung -> Smartphones
(3, 3),  -- Dell -> Laptops
(4, 3),  -- MacBook -> Laptops
(5, 4),  -- Rice cooker -> Home Appliances
(6, 4),  -- Fridge -> Home Appliances
(7, 5),  -- Rice -> Grocery
(8, 5),  -- Eggs -> Grocery
(9, 6),  -- Drink -> Beverage
(10,7);   -- Shampoo -> Personal Care


-- =====================================
-- 13. SUBCATEGORY TABLE (10 rows)
-- =====================================
INSERT INTO Subcategory (ChildCategoryID, ParentCategoryID) VALUES
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 5),
(7, 1),
(8, 1),
(9, 1),
(10,1);


-- =====================================
-- 14. SUPPLIES TABLE (10 rows)
-- =====================================
INSERT INTO Supplies (SupplierID, ProductID) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 5),
(5, 7),
(6, 8),
(7, 9),
(8,10),
(9, 4),
(10,6);


-- =====================================
-- 15. HAS_PRODUCT TABLE (10 rows)
-- =====================================
INSERT INTO Has_Product (StoreID, ProductID, Quantity) VALUES
(1, 1, 20),
(1, 2, 15),
(1, 3, 10),
(1, 7, 50),
(1, 9, 40),

-- Store 2
(2, 3, 15),

-- Store 3
(3, 4, 10),
(3, 5, 25),
(3,10,20),

-- Store 4
(4, 4, 8),
(4, 5, 20),
(4, 7, 30),

-- Store 5
(5, 6, 12),

-- Store 6
(6, 7, 30),
(6, 9, 20),

-- Store 7
(7, 9, 20),
(7,10,20),

-- Store 8
(8,10,15),

-- Store 9
(9, 4, 10);


-- =====================================
-- 16. STORE_PRODUCT TABLE (10 rows)
-- =====================================
INSERT INTO Store_Product (WarehouseID, ProductID, Quantity) VALUES
(1, 1, 100),
(1, 2, 80),
(1, 3, 60),
(1, 4, 50),
(1, 5, 70),
(5, 6, 40),
(6, 7, 200),
(7, 8, 150),
(8, 9, 120),
(9, 10, 90);


-- =====================================
-- 17. SHOPPING_HISTORY TABLE (10 rows)
-- =====================================
INSERT INTO Shopping_History (CustomerID, LastViewDate) VALUES
(1,  '2025-11-20 10:00:00'),
(2,  '2025-11-20 12:00:00'),
(3,  '2025-11-21 12:00:00'),
(4,  '2025-11-21 19:00:00'),
(5,  '2025-11-22 09:00:00'),
(6,  '2025-11-22 17:00:00'),
(7,  '2025-11-23 11:00:00'),
(8,  '2025-11-23 19:00:00'),
(9,  '2025-11-24 13:30:00'),
(10, '2025-11-24 21:00:00');


-- =====================================
-- 18. REFERS_TO TABLE (10 rows)
-- =====================================
INSERT INTO Refers_To (HistoryID, ProductID, PurchaseDate) VALUES
(1, 1, '2025-11-20 10:00:00'),
(2, 2, '2025-11-20 12:00:00'),
(3, 3, '2025-11-21 12:00:00'),
(4, 5, '2025-11-21 19:00:00'),
(5, 7, '2025-11-22 09:00:00'),
(6, 8, '2025-11-22 17:00:00'),
(7, 9, '2025-11-23 11:00:00'),
(8,10, '2025-11-23 19:00:00'),
(9, 1, '2025-11-24 13:30:00'),
(10,4, '2025-11-24 21:00:00');


-- =====================================
-- 19. WISHLIST TABLE (10 rows)
-- =====================================
INSERT INTO WishList (CustomerID, LastUpdateDate) VALUES
(1,  '2025-10-20 09:10:00'),
(2,  '2025-11-18 08:00:00'),
(3,  '2025-11-01 11:30:00'),
(4,  '2025-11-10 18:00:00'),
(5,  '2025-05-22 08:20:00'),
(6,  '2025-11-22 13:00:00'),
(7,  '2025-11-22 09:55:00'),
(8,  '2025-11-23 18:10:00'),
(9,  '2025-11-24 12:40:00'),
(10, '2025-11-24 20:20:00');


-- =====================================
-- 20. HAS_WISHLISTED_PRODUCT TABLE (10 rows)
-- =====================================
INSERT INTO Has_WishListed_Product (WishListID, ProductID, WishListDate) VALUES
(1, 1,  '2025-10-20 09:10:00'),
(2, 2,  '2025-11-18 08:00:00'),
(3, 3,  '2025-11-01 11:30:00'),
(4, 4,  '2025-11-10 18:00:00'),
(5, 5,  '2025-05-22 08:20:00'),
(6, 7,  '2025-11-22 13:00:00'),
(7, 9,  '2025-11-22 09:55:00'),
(8,10,  '2025-11-23 18:10:00'),
(9, 1,  '2025-11-24 12:40:00'),
(10,4,  '2025-11-24 20:20:00');


-- =====================================
-- 21. SHOPPING_CART TABLE (10 rows)
-- =====================================
INSERT INTO Shopping_Cart (CustomerID) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10);


-- =====================================
-- 22. CART_ITEM TABLE (10 rows)
-- =====================================
INSERT INTO Cart_Item (CartID, ProductID, Quantity, AddedDate) VALUES
(1, 1, 1, '2025-11-20 09:20:00'),
(1, 7, 1, '2025-11-20 09:21:00'),
(2, 2, 2, '2025-11-20 11:10:00'),
(3, 3, 2, '2025-11-21 11:40:00'),
(4, 4, 3, '2025-11-21 18:10:00'),
(4,10,3, '2025-11-21 18:12:00'),
(5, 5, 4, '2025-11-22 08:35:00'),
(5, 7, 4, '2025-11-22 08:36:00'),
(7, 7, 5, '2025-11-23 10:05:00'),
(8, 9, 5, '2025-11-23 18:20:00');


-- =====================================
-- 23. ORDER TABLE (10 rows)
-- =====================================
INSERT INTO `Order` (CustomerID, PickupSlotID, StoreID, OrderDate, Status) VALUES
(1,  1, 1, '2025-11-20 10:00:00', 'Completed'),
(2,  2, 1, '2025-11-20 12:00:00', 'Completed'),
(3,  3, 2, '2025-11-21 12:00:00', 'Completed'),
(4,  4, 3, '2025-11-21 19:00:00', 'Completed'),
(5,  5, 4, '2025-11-22 09:00:00', 'Ready for Pickup'),
(6,  6, 5, '2025-11-22 17:00:00', 'Awaiting Picking'),
(7,  7, 6, '2025-11-23 11:00:00', 'Pending'),
(8,  8, 7, '2025-11-23 19:00:00', 'Pending'),
(9,  9, 8, '2025-11-24 13:30:00', 'Cancelled'),
(10,10, 9, '2025-11-24 21:00:00', 'Completed');


-- =====================================
-- 24. ORDERED_ITEM TABLE (10 rows)
-- =====================================
INSERT INTO Ordered_Item (OrderID, ProductID, Quantity) VALUES
(1, 1, 1),
(1, 7, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(4,10,1),
(5, 5, 1),
(5, 7, 1),
(6, 6, 1),
(7, 7, 1), 
(7, 9, 1),
(8, 9, 1),
(9,10,1),
(10,4,1);


-- =====================================
-- 25. PAYMENT TABLE (10 rows)
-- =====================================
INSERT INTO Payment (OrderID, PaymentMethod, Amount, Date, Status) VALUES
(1,  'Credit Card', 1010, '2025-11-20 10:05:00', 'Completed'),
(2,  'Debit Card',  880, '2025-11-20 12:05:00', 'Completed'),
(3,  'E-Wallet',    720, '2025-11-21 12:05:00', 'Completed'),
(4,  'Credit Card', 1286, '2025-11-21 19:05:00', 'Completed'),
(5,  'Cash',         70, '2025-11-22 09:05:00', 'Pending'),
(6,  'Bank Transfer',360, '2025-11-22 17:05:00', 'Pending'),
(7,  'E-Wallet',      17.2, '2025-11-23 11:05:00', 'Pending'),
(8,  'Cash',          7.2, '2025-11-23 19:05:00', 'Pending'),
(9,  'Credit Card',   6, '2025-11-24 13:35:00', 'Refunded'),
(10, 'Debit Card',  1280, '2025-11-24 21:05:00', 'Completed');


-- =====================================
-- 26. HANDLES_ORDER TABLE (10 rows)
-- =====================================
INSERT INTO Handles_Order (StaffID, OrderID) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10,10);


-- =====================================
-- 27. COUPON TABLE (10 rows)
-- =====================================
INSERT INTO Coupon (
    Name, Description, DiscountValue, CouponAmount,
    MinimumPriceRequired, CreatedDate, ExpiryDate,
    StoreID, CustomerID, OrderID
) VALUES
('WELCOME10',   'Giam 10% cho don hang dau tien',   4, 100, 20,  '2025-01-01', '2025-12-31', 1, 1,  1),
('HCMFREESHIP', 'Giam phi giao hang tai HCM',       2,  200, 12,  '2025-02-01', '2025-12-31', 1, 1, NULL),
('RICE20',      'Giam 20k cho gao ST25',            0.8,  150, 8,  '2025-03-01', '2025-10-31', 1, 5,  5),
('LAPTOP500',   'Giam 500k cho laptop',             20, 50, 400, '2025-01-15', '2025-09-30', 1, 3,  3),
('PHONE300',    'Giam 300k cho smartphone',         12, 80, 320,  '2025-01-20', '2025-09-30', 1, 2,  2),
('BEVERAGE10',  'Giam 10k do uong',                 0.4,  300, 4,  '2025-04-01', '2025-12-31', 1, 1, NULL),
('HOME50',      'Giam 50k do gia dung',             2,  120, 20,  '2025-05-01', '2025-12-31', 5, 6,  6),
('PERSONAL30',  'Giam 30k my pham',                 1.2,  200, 12,  '2025-06-01', '2025-12-31', 1, 6,  NULL),
('FLASHSALE',   'Ma giam gia flash sale',           6, 50, 40,  '2025-07-01', '2025-07-31', 6, 7,  NULL),
('WEEKEND20',   'Giam 20k cuoi tuan',               0.8,  500, 8,  '2025-01-01', '2025-12-31', 7, 8,  8);

-- =====================================
-- 28. IS_APPLICABLE_FOR TABLE (10 rows)
-- =====================================
INSERT INTO Is_Applicable_For (CouponID, ProductID) VALUES
(1, 1),   -- WELCOME10 -> iPhone 15 (đơn đầu tiên)
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(3, 7),   -- RICE20   -> Gao ST25 5kg
(4, 3),   -- LAPTOP500 -> Dell Inspiron 15
(4, 4),   -- LAPTOP500 -> MacBook Air M2
(5, 1),   -- PHONE300  -> iPhone 15
(5, 2),   -- PHONE300  -> Samsung Galaxy S24
(6, 9),   -- BEVERAGE10 -> Tra Xanh Khong Do
(7, 5),   -- HOME50    -> Panasonic Rice Cooker
(7, 6),   -- HOME50    -> Sharp Fridge 300L
(8,10);   -- PERSONAL30 -> Shampoo Dohas 650ml



-- =====================================
-- 29. LINKS_TO TABLE (10 rows)
-- =====================================
INSERT INTO Links_To (StoreID, WarehouseID) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10,10);




-- -----------------------------------   Task 2.1    -------------------------------------


DELIMITER //

-- 1.INSERT: sp_AddToCart 

CREATE PROCEDURE sp_AddToCart(
    IN p_CartID INT,
    IN p_ProductID INT,
    IN p_Quantity INT,
    IN p_StoreID INT
)
BEGIN
    DECLARE v_CurrentStock INT DEFAULT 0;
    DECLARE v_ProductExists INT;
    DECLARE v_ExistingQty INT DEFAULT 0;
    DECLARE v_TotalNeeded INT DEFAULT 0;
    DECLARE v_ExistingCartItemID INT;
    DECLARE v_CartExists INT;

    -- 1. Validation: Số lượng phải dương
    IF p_Quantity <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: Quantity must be greater than 0.';
    END IF;

    -- 2. Validation: Kiểm tra Giỏ hàng có tồn tại không 
    SELECT COUNT(*) INTO v_CartExists FROM Shopping_Cart WHERE CartID = p_CartID;
    
    IF v_CartExists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: Shopping Cart not found.';
    END IF;

    -- 3. Validation: Kiểm tra sản phẩm có tồn tại không
    SELECT COUNT(*) INTO v_ProductExists
    FROM Product
    WHERE ProductID = p_ProductID;

    IF v_ProductExists = 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Error: Product does not exist in the system.';
    END IF;

    -- 4. Validation: Kiểm tra tồn kho tại Store
    SELECT Quantity INTO v_CurrentStock
    FROM Has_Product
    WHERE StoreID = p_StoreID AND ProductID = p_ProductID;

    -- Nếu không tìm thấy dòng nào trong Has_Product thì coi như kho = 0
    IF v_CurrentStock IS NULL THEN
        SET v_CurrentStock = 0;
    END IF;

    -- 5. Logic: Kiểm tra hàng đã có trong giỏ chưa
    SELECT Quantity, CartItemID INTO v_ExistingQty, v_ExistingCartItemID
    FROM Cart_Item
    WHERE CartID = p_CartID AND ProductID = p_ProductID;

    -- Tính tổng số lượng cần (Trong giỏ + Thêm mới)
    SET v_TotalNeeded = IFNULL(v_ExistingQty, 0) + p_Quantity;

    -- So sánh với kho
    IF v_TotalNeeded > v_CurrentStock THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: Store does not have enough stock (including items already in your cart).';
    END IF;

    -- 6. Action: Insert hoặc Update
    IF v_ExistingCartItemID IS NOT NULL THEN
        -- Case A: Đã có -> Update cộng dồn
        UPDATE Cart_Item
        SET Quantity = v_TotalNeeded,
            AddedDate = NOW()
        WHERE CartItemID = v_ExistingCartItemID;
    ELSE
        -- Case B: Chưa có -> Insert mới
        INSERT INTO Cart_Item (CartID, ProductID, Quantity, AddedDate)
        VALUES (p_CartID, p_ProductID, p_Quantity, NOW());
    END IF;

END //

DELIMITER ;

-- =========================================================================
-- TEST CASES FOR sp_AddToCart
-- =========================================================================

-- TEST CASE 1: Add new item to cart (Success)
SELECT * FROM Cart_Item WHERE CartID = 1; -- Before: Cart 1 has items 1 and 7
CALL sp_AddToCart(1, 3, 1, 1); -- Add 1x Dell Inspiron (PID 3) to Cart 1. Store 1 has stock.
SELECT * FROM Cart_Item WHERE CartID = 1; -- After: Should include ProductID 3

-- TEST CASE 2: Add existing item to cart (Success - Update Quantity)
SELECT * FROM Cart_Item WHERE CartID = 1 AND ProductID = 1; -- Before: Qty 1
CALL sp_AddToCart(1, 1, 1, 1); -- Add 1 more iPhone 15 (PID 1)
SELECT * FROM Cart_Item WHERE CartID = 1 AND ProductID = 1; -- After: Qty should be 2


-- 2. UPDATE: sp_UpdateCartItem

DELIMITER //

CREATE PROCEDURE sp_UpdateCartItem(
    IN p_CartItemID INT,
    IN p_NewQuantity INT,
    IN p_StoreID INT
)
BEGIN
    DECLARE v_ProductID INT;
    DECLARE v_CurrentStock INT;
    DECLARE v_ItemExists INT;

    -- 1. Validation: Số lượng mới
    IF p_NewQuantity <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: Quantity must be greater than 0. Please use Delete to remove the item.';
    END IF;

    -- 2. Validation: Kiểm tra CartItem có tồn tại không
    SELECT COUNT(*) INTO v_ItemExists FROM Cart_Item WHERE CartItemID = p_CartItemID;

    IF v_ItemExists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: Cart item not found.';
    END IF;

    -- 3. Logic: Lấy ProductID
    SELECT ProductID INTO v_ProductID
    FROM Cart_Item
    WHERE CartItemID = p_CartItemID;

    -- 4. Logic: Kiểm tra kho
    SELECT Quantity INTO v_CurrentStock
    FROM Has_Product
    WHERE StoreID = p_StoreID AND ProductID = v_ProductID;

    IF v_CurrentStock IS NULL OR v_CurrentStock < p_NewQuantity THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: Requested quantity exceeds current store stock.';
    END IF;

    -- 5. Action: Update
    UPDATE Cart_Item
    SET Quantity = p_NewQuantity
    WHERE CartItemID = p_CartItemID;

END //

DELIMITER ;

-- =========================================================================
-- TEST CASES FOR sp_UpdateCartItem
-- =========================================================================

-- TEST CASE 1: Update quantity (Success)
-- Assume CartItemID 3 is for Cart 2, Product 2 (Quantity 2)
SELECT * FROM Cart_Item WHERE CartItemID = 3;
CALL sp_UpdateCartItem(3, 5, 1); -- Update to 5 units. Store 1 has stock (15 units)
SELECT * FROM Cart_Item WHERE CartItemID = 3; -- After: Quantity 5

-- TEST CASE 2: Update quantity exceeds stock (Fail)
-- Store 1 has 15 Samsung S24s. Try to set cart quantity to 20.
CALL sp_UpdateCartItem(3, 20, 1); -- This should raise Error 45000 


-- 3. DELETE: sp_DeleteCartItem 

DELIMITER //

CREATE PROCEDURE sp_DeleteCartItem(
    IN p_CartItemID INT
)
BEGIN
    DECLARE v_ItemExists INT;

    -- 1. Validation: Kiểm tra tồn tại
    SELECT COUNT(*) INTO v_ItemExists FROM Cart_Item WHERE CartItemID = p_CartItemID;

    IF v_ItemExists = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Error: Cart item not found.';
    END IF;

    -- 2. Action: Delete
    DELETE FROM Cart_Item
    WHERE CartItemID = p_CartItemID;

END //

DELIMITER ;

-- =========================================================================
-- TEST CASES FOR sp_DeleteCartItem
-- =========================================================================

-- TEST CASE 1: Delete existing item (Success)
SELECT * FROM Cart_Item WHERE CartItemID = 4; -- Before: Exists
CALL sp_DeleteCartItem(4); 
SELECT * FROM Cart_Item WHERE CartItemID = 4; -- After: Empty/Null

-- TEST CASE 2: Delete non-existent item (Fail)
CALL sp_DeleteCartItem(9999); -- This should raise Error 45000


-- -----------------------------------   Task 2.2    -------------------------------------

-- 2.2.1

DELIMITER $$

CREATE TRIGGER trg_validate_coupon_before_order
BEFORE UPDATE ON Coupon
FOR EACH ROW
BEGIN
    IF NEW.OrderID IS NOT NULL THEN
        
        IF NEW.ExpiryDate < CURDATE() THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Cannot assign an expired coupon to an order';
        END IF;

    END IF;
END $$

DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_validate_coupon_before_insert
BEFORE INSERT ON Coupon
FOR EACH ROW
BEGIN
    IF NEW.ExpiryDate < CURDATE() THEN
        IF NEW.CustomerID IS NOT NULL AND NEW.OrderID IS NOT NULL THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Cannot assign an expired coupon to an order and customer';
    
        ELSEIF NEW.CustomerID IS NOT NULL THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Cannot assign an expired coupon to a customer';
        
        ELSEIF NEW.OrderID IS NOT NULL THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Cannot assign an expired coupon to an order';
        END IF;
    END IF;
END $$

DELIMITER ;

-- =========================================================================
-- TEST CASES FOR COUPON TRIGGERS
-- =========================================================================

-- TEST CASE 1: Insert Expired Coupon assigned to customer (Should Fail)
INSERT INTO Coupon (Name, DiscountValue, CreatedDate, ExpiryDate, CustomerID) 
VALUES ('FAIL', 10, '2025-01-01', '2020-01-01', 1); -- Triggers Error 45000

-- TEST CASE 2: Update Coupon to assign to Order when expired (Should Fail)
-- Create expired coupon first (unassigned is okay)
INSERT INTO Coupon (Name, DiscountValue, CreatedDate, ExpiryDate) VALUES ('OLD', 10, '2019-01-01', '2020-01-01');
SET @CouponID = LAST_INSERT_ID();

-- Try to assign to Order 1
UPDATE Coupon SET OrderID = 1 WHERE CouponID = @CouponID; -- Triggers Error 45000
DELETE FROM Coupon WHERE CouponID = @CouponID;


-- 2.2.2 đã hiện thực phía trên 




-- -----------------------------------   Task 2.3    -------------------------------------


-- =============================================================
-- PROCEDURE 1: Low Stock Inventory Report (Specific Product)
-- Purpose: Find stores in a specific city that have low stock
--          of a SPECIFIC product.
-- =============================================================

DELIMITER $$

CREATE PROCEDURE sp_GetLowStockInventory(
  IN p_CityName VARCHAR(100),
  IN p_ProductId INT,
  IN p_StockThreshold INT
)
BEGIN
  SELECT
    p.ProductID,
    p.ProductName,
    s.Name AS StoreName,
    s.City,
    hp.Quantity AS CurrentStock,
    p.ProductPrice
  FROM Product p
    JOIN Has_Product hp ON p.ProductID = hp.ProductID
    JOIN Store s ON hp.StoreID = s.StoreID
  WHERE s.City = p_CityName
    AND p.ProductID = p_ProductId -- Filter by the specific Product ID
    AND hp.Quantity <= p_StockThreshold
  ORDER BY hp.Quantity ASC;
END $$

DELIMITER ;

-- =========================================================================
-- TEST CASES FOR sp_GetLowStockInventory
-- =========================================================================

-- TEST CASE 1: Check low stock for iPhone 15 (ID 1) in Ho Chi Minh with threshold 30
-- Store 1 has 20 units (Low)
SELECT * FROM Has_Product WHERE ProductID = 1 AND StoreID = 1;
CALL sp_GetLowStockInventory('Ho Chi Minh', 1, 30); 

-- TEST CASE 2: Check low stock for Dell Laptop (ID 3) in Ho Chi Minh with threshold 5
-- Store 1 has 10 units (Not Low)
SELECT * FROM Has_Product WHERE ProductID = 3 AND StoreID = 1;
CALL sp_GetLowStockInventory('Ho Chi Minh', 3, 5); -- Should return empty result


-- =============================================================
-- PROCEDURE 2: Top Rated Products Dashboard
-- Context: Promoting "Customer Favorites" by analyzing review scores.
--
-- Requirements:
-- 1. Use Aggregate function (AVG, COUNT)
-- 2. Include GROUP BY, HAVING (Filter by Rating threshold), WHERE
-- 3. Join 2+ tables (Product, Product_Review, Category, Belongs_To)
-- =============================================================

DELIMITER $$

CREATE PROCEDURE sp_GetTopRatedProducts(
    IN p_CategoryName VARCHAR(255),
    IN p_MinRating INT,
    IN p_StoreID INT
)
BEGIN
    SELECT 
        p.ProductID,
        p.ProductName,
        c.CategoryName,
        p.ProductPrice,
        p.PictureUrl,
        COUNT(r.ReviewID) AS TotalReviews,
        ROUND(AVG(r.Rating), 1) AS AverageRating
    FROM Product p
    JOIN Belongs_To bt ON p.ProductID = bt.ProductID
    JOIN Category c ON bt.CategoryID = c.CategoryID
    LEFT JOIN Product_Review r ON p.ProductID = r.ProductID
    LEFT JOIN Has_Product hp ON p.ProductID = hp.ProductID
    WHERE c.CategoryName = p_CategoryName
      AND (p_StoreID IS NULL OR hp.StoreID = p_StoreID)
    GROUP BY p.ProductID, p.ProductName, c.CategoryName, p.ProductPrice
    HAVING AVG(IFNULL(r.Rating, 0)) >= p_MinRating
    ORDER BY AverageRating DESC;
END $$

DELIMITER ;

-- =========================================================================
-- TEST CASES FOR sp_GetTopRatedProducts
-- =========================================================================

-- TEST CASE 1: Get top rated Smartphones with rating >= 4
CALL sp_GetTopRatedProducts('Smartphones', 4, NULL);

-- TEST CASE 2: Get top rated Home Appliances at Store 3
CALL sp_GetTopRatedProducts('Home Appliances', 3, 3);


-- -----------------------------------   Task 2.4    -------------------------------------
DELIMITER $$
CREATE FUNCTION fn_calculate_loyaltypoints(p_customerid INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE v_totalpoints INT DEFAULT 0;
    DECLARE v_totalprice DECIMAL(10,2);
    DECLARE v_status VARCHAR(50);
    DECLARE done INT DEFAULT FALSE;
    DECLARE flag INT;

    DECLARE cur_orders CURSOR FOR
        SELECT Status, TotalPrice FROM `Order` WHERE CustomerID = p_customerid;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Validate customer exists
    SELECT COUNT(*) INTO flag FROM Customer WHERE CustomerID = p_customerid;
    IF flag = 0 THEN 
        RETURN 0;
    END IF;

    OPEN cur_orders;

    read_loop: LOOP
        FETCH cur_orders INTO v_status, v_totalprice;
        IF done THEN 
            LEAVE read_loop;
        END IF;

        -- Only count completed orders: $4 = 1 point
        IF v_status = 'Completed' THEN 
            SET v_totalpoints = v_totalpoints + FLOOR(v_totalprice / 4);
        END IF;
    END LOOP;

    CLOSE cur_orders;

    RETURN v_totalpoints;
END$$
DELIMITER ;

-- =========================================================================
-- TEST CASES FOR fn_calculate_loyaltypoints
-- =========================================================================

-- TEST CASE 1: Calculate points for Customer 1 (Has completed orders)
SELECT fn_calculate_loyaltypoints(1) AS CalculatedPoints;

-- TEST CASE 2: Calculate points for Customer 7 (Orders are Pending)
SELECT fn_calculate_loyaltypoints(7) AS CalculatedPoints; -- Expect 0 based on current data logic


-- =============================================
-- Function 2: fn_getstockstatuslabel
-- Thêm validate ProductID
-- =============================================\
DELIMITER $$
CREATE FUNCTION fn_getstockstatuslabel(p_productid INT)
RETURNS VARCHAR(50)
DETERMINISTIC
BEGIN
    DECLARE v_status VARCHAR(50);
    DECLARE v_quantity INT;
    DECLARE done INT DEFAULT FALSE;
    DECLARE total INT DEFAULT 0;
    DECLARE flag INT;
    
    DECLARE p_cursors CURSOR FOR 
        SELECT Quantity FROM Store_Product WHERE ProductID = p_productid;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Validate product exists
    SELECT COUNT(*) INTO flag FROM Product WHERE ProductID = p_productid;
    IF flag = 0 THEN 
        RETURN 'Product not found';
    END IF;

    OPEN p_cursors;
    read_loop: LOOP
        FETCH p_cursors INTO v_quantity;
        IF done THEN
            LEAVE read_loop;
        END IF;
        SET total = total + v_quantity;
    END LOOP;
    CLOSE p_cursors;

    IF total = 0 THEN
        SET v_status = 'Out of Stock';
    ELSEIF total <= 5 THEN
        SET v_status = 'Low Stock';
    ELSE
        SET v_status = 'In Stock';
    END IF;

    RETURN v_status;
END$$
DELIMITER ;

-- =========================================================================
-- TEST CASES FOR fn_getstockstatuslabel
-- =========================================================================

-- TEST CASE 1: Check status for Product 1 (High stock in Warehouses)
SELECT fn_getstockstatuslabel(1) AS StockStatus; -- Expect 'In Stock'

-- TEST CASE 2: Check status for a Product with 0 stock (if any) or imaginary product
SELECT fn_getstockstatuslabel(9999) AS StockStatus; -- Expect 'Product not found'


-- ===================================== Added procedure

DROP PROCEDURE IF EXISTS sp_CreateOrder;

DELIMITER $$
CREATE PROCEDURE sp_CreateOrder(
    IN p_CartID INT,
    IN p_StoreID INT,
    IN p_PaymentMethodID varchar(50),
    IN p_TotalAmount DECIMAL(10,2)
)
BEGIN
    DECLARE v_CustomerID INT;
    DECLARE v_NewOrderID INT;

    SELECT CustomerID INTO v_CustomerID
    FROM Shopping_Cart
    WHERE CartID = p_CartID;
    
    INSERT INTO `Order` (CustomerID, StoreID, OrderDate, Status, TotalPrice)
    VALUES (v_CustomerID, p_StoreID, NOW(), 'Completed', p_TotalAmount);

    SET v_NewOrderID = LAST_INSERT_ID();

    INSERT INTO Payment (OrderID, PaymentMethod, Amount, Date, STATUS)
    VALUES (v_NewOrderID, p_PaymentMethodID, p_TotalAmount, NOW(), 'Completed');

    DELETE FROM Cart_Item WHERE CartID = p_CartID;
END $$
DELIMITER ;

-- =========================================================================
-- TEST CASES FOR sp_CreateOrder
-- =========================================================================

-- TEST CASE 1: Create Order from Cart 5 (Customer 5)
SELECT * FROM Cart_Item WHERE CartID = 5; -- Check items exist
CALL sp_CreateOrder(5, 4, 'Cash', 100.00);
SELECT * FROM `Order` WHERE CustomerID = 5 ORDER BY OrderDate DESC LIMIT 1; -- Verify Order Created
SELECT * FROM Cart_Item WHERE CartID = 5; -- Verify Cart Empty

-- TEST CASE 2: Create Order from Cart 7 (Customer 7)
SELECT * FROM Cart_Item WHERE CartID = 7;
CALL sp_CreateOrder(7, 6, 'Credit Card', 50.00);
SELECT * FROM `Order` WHERE CustomerID = 7 ORDER BY OrderDate DESC LIMIT 1;


-- DROP TRIGGER IF EXISTS after_Order_insert_add_points;
-- DROP TRIGGER IF EXISTS after_Order_update_add_points;

DELIMITER $$

-- 1. AFTER INSERT: Order được tạo đã ở trạng thái Completed
CREATE TRIGGER after_Order_insert_add_points
AFTER INSERT ON `Order`
FOR EACH ROW
BEGIN
    DECLARE v_points_to_add INT;

    IF NEW.Status = 'Completed' THEN
        SET v_points_to_add = FLOOR(NEW.TotalPrice / 4);

        UPDATE Customer c
        SET c.LoyaltyPoints = c.LoyaltyPoints + v_points_to_add
        WHERE c.CustomerID = NEW.CustomerID;
    END IF;
END$$


-- 2. AFTER UPDATE: Status đổi từ KHÁC Completed -> Completed
CREATE TRIGGER after_Order_update_add_points
AFTER UPDATE ON `Order`
FOR EACH ROW
BEGIN
    DECLARE v_points_to_add INT;

    IF OLD.Status <> 'Completed' AND NEW.Status = 'Completed' THEN
        SET v_points_to_add = FLOOR(NEW.TotalPrice / 4);

        UPDATE Customer c
        SET c.LoyaltyPoints = c.LoyaltyPoints + v_points_to_add
        WHERE c.CustomerID = NEW.CustomerID;
    END IF;
END$$

DELIMITER ;


-- =========================================================================
-- TEST CASES FOR ORDER POINTS TRIGGERS
-- =========================================================================

-- TEST CASE 1: Insert new completed order and check points increase
SELECT LoyaltyPoints FROM Customer WHERE CustomerID = 1; -- Check before
INSERT INTO `Order` (CustomerID, StoreID, Status, TotalPrice) VALUES (1, 1, 'Completed', 400.00);
SELECT LoyaltyPoints FROM Customer WHERE CustomerID = 1; -- After: Should increase by 100

-- TEST CASE 2: Update existing order to Completed and check points
INSERT INTO `Order` (CustomerID, StoreID, Status, TotalPrice) VALUES (2, 1, 'Pending', 200.00);
SET @PendingOrderID = LAST_INSERT_ID();
SELECT LoyaltyPoints FROM Customer WHERE CustomerID = 2; -- Check before
UPDATE `Order` SET Status = 'Completed' WHERE OrderID = @PendingOrderID;
SELECT LoyaltyPoints FROM Customer WHERE CustomerID = 2; -- After: Should increase by 50


-- -----------------------------------   Test Queries    -------------------------------------


INSERT INTO Coupon (Name, Description, DiscountValue, CouponAmount, MinimumPriceRequired, CreatedDate, ExpiryDate, StoreID, CustomerID, OrderID)
VALUES (
    'EXPIRED10',
    'Mã giảm giá đã hết hạn - Test',
    10.00,
    50.00,
    100.00,
    '2024-01-01',
    '2024-12-31',  -- Hết hạn ngày 31/12/2024
    1,
    NULL,
    NULL
);

INSERT INTO Coupon (Name, Description, DiscountValue, CouponAmount, MinimumPriceRequired, CreatedDate, ExpiryDate, StoreID, CustomerID, OrderID)
VALUES (
    'STORE2ONLY',
    'Mã chỉ dùng ở Store 2',
    15.00,
    30.00,
    50.00,
    '2024-01-01',
    '2025-12-31',
    2,  -- StoreID = 2 (không phải store 1)
    NULL,
    NULL
);